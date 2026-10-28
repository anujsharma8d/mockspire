const Answer = require("../models/Answer");
const InterviewSession = require("../models/InterviewSession");
const InterviewQuestion = require("../models/InterviewQuestion");
const { evaluateAndGenerateFollowUp } = require("../services/adaptiveInterviewService");
const { selectQuestionFromBank, createFollowUpQuestion, buildInterviewContext } = require("../services/questionSelectionService");

const saveAnswer = async (req, res) => {
    try {
        const { interviewId, answers, duration } = req.body;

        const session = await InterviewSession.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!session) {
            return res.status(404).json({
                message: "Interview session not found"
            });
        }

        session.duration = duration;
        await session.save();

        const answerDocs = answers.map((item) => ({
            user: req.user.id,
            interviewId,
            questionId: item.questionId,
            answer: item.answer,
        }));

        const newAnswers = await Answer.insertMany(answerDocs);

        res.status(201).json({
            message: "Answers submitted successfully",
            newAnswers
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const submitAnswer = async (req, res) => {
    try {
        const { interviewId, questionId, answer } = req.body;

        // 1. Validate answer
        if (!answer || answer.trim().length === 0) {
            return res.status(400).json({
                message: "Answer cannot be empty"
            });
        }

        const session = await InterviewSession.findOne({
            _id: interviewId,
            user: req.user.id
        }).populate("questions");

        if (!session) {
            return res.status(404).json({
                message: "Interview session not found"
            });
        }

        // 2. Idempotent save / update of the answer (prevents duplicate entries during network retries or double clicks)
        const currentAnswerDoc = await Answer.findOneAndUpdate(
            {
                interviewId,
                questionId,
                user: req.user.id
            },
            {
                answer: answer.trim()
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        );

        console.log("Answer saved/updated for session:", session._id, "Answer ID:", currentAnswerDoc._id);

        // 3. Get current question text
        const currentQuestion = await InterviewQuestion.findById(questionId).lean();
        if (!currentQuestion) {
            return res.status(400).json({
                message: "Invalid question ID"
            });
        }

        // 4. Check if question limit reached BEFORE invoking AI
        // questionsAsked represents questions already presented to the candidate
        const hasReachedQuestionLimit = session.questionsAsked >= session.questionCount;

        if (hasReachedQuestionLimit) {
            console.log(`Question limit reached (${session.questionsAsked}/${session.questionCount}), concluding interview.`);
            return res.status(200).json({
                message: "Answer saved",
                isLastQuestion: true,
                answerId: currentAnswerDoc._id
            });
        }

        // 5. Fetch all answers for context (with populated question details in ONE query)
        const allAnswers = await Answer.find({
            interviewId,
            user: req.user.id
        }).populate("questionId").sort({ createdAt: 1 });

        const context = await buildInterviewContext(session, allAnswers);

        let evaluation = null;
        let nextQuestion = null;

        // 6. Fast, unified AI evaluation & follow-up question generation (1 single LLM call)
        try {
            console.log("Calling unified AI evaluation & follow-up question generator...");
            const aiResult = await evaluateAndGenerateFollowUp({
                currentQuestion: currentQuestion.question,
                candidateAnswer: answer.trim(),
                role: session.role,
                interviewType: session.interviewType,
                difficulty: session.difficulty,
                previousAnswers: context.previousAnswers,
                coveredTopics: context.coveredTopics,
                recentQuestions: context.askedQuestionTexts
            });

            evaluation = aiResult.evaluation;
            const followUp = aiResult.followUp;

            // Save evaluation to the answer document
            if (evaluation) {
                currentAnswerDoc.evaluation = {
                    correctness: typeof evaluation.correctness === 'number' ? evaluation.correctness : 7,
                    depth: typeof evaluation.depth === 'number' ? evaluation.depth : 7,
                    clarity: typeof evaluation.clarity === 'number' ? evaluation.clarity : 7,
                    gaps: Array.isArray(evaluation.gaps) ? evaluation.gaps : []
                };
                await currentAnswerDoc.save();
            }

            // Create follow-up question if AI provided a question
            if (followUp && followUp.question && followUp.question.trim().length > 10) {
                nextQuestion = await createFollowUpQuestion({
                    interviewId: session._id,
                    question: followUp.question.trim(),
                    topic: followUp.topic || evaluation?.suggestedTopic || session.interviewType,
                    role: session.role,
                    category: session.interviewType,
                    difficulty: session.difficulty
                });

                session.questions.push(nextQuestion._id);
                console.log("AI follow-up question created successfully:", nextQuestion._id);
            }

        } catch (aiError) {
            console.warn("AI generation failed or rate-limited. Activating resilient fallback:", aiError.message);

            // Ensure baseline evaluation is saved so grading remains intact
            if (!currentAnswerDoc.evaluation || currentAnswerDoc.evaluation.correctness === undefined) {
                currentAnswerDoc.evaluation = {
                    correctness: 7,
                    depth: 7,
                    clarity: 7,
                    gaps: []
                };
                await currentAnswerDoc.save();
            }
        }

        // 7. Resilient Fallback: If AI did not produce a question (traffic spike / rate limit / model timeout)
        if (!nextQuestion) {
            console.log("Selecting question from fallback bank for role:", session.role);
            const fallbackData = await selectQuestionFromBank({
                interviewId: session._id,
                suggestedTopic: evaluation?.suggestedTopic,
                nextAction: evaluation?.nextAction,
                difficulty: session.difficulty,
                role: session.role,
                category: session.interviewType,
                excludeQuestionIds: context.answeredQuestionIds,
                excludeQuestionTexts: context.askedQuestionTexts,
                gaps: evaluation?.gaps || []
            });

            nextQuestion = await createFollowUpQuestion({
                interviewId: session._id,
                question: fallbackData.question,
                topic: fallbackData.topic || session.interviewType,
                role: session.role,
                category: session.interviewType,
                difficulty: fallbackData.difficulty || session.difficulty
            });

            session.questions.push(nextQuestion._id);
            console.log("Fallback question created and attached:", nextQuestion._id);
        }

        // 8. Increment questionsAsked since we're delivering the next question to the candidate
        session.questionsAsked += 1;
        await session.save();

        console.log(`Question ${session.questionsAsked} of ${session.questionCount} will be displayed next`);

        return res.status(200).json({
            message: "Answer saved",
            isLastQuestion: false,
            answerId: currentAnswerDoc._id,
            nextQuestion: {
                _id: nextQuestion._id,
                question: nextQuestion.question,
                difficulty: nextQuestion.difficulty,
                category: nextQuestion.category
            }
        });

    } catch (err) {
        console.error("submitAnswer ERROR:", err);
        return res.status(500).json({
            message: "Failed to submit answer: " + err.message
        });
    }
};

module.exports = { saveAnswer, submitAnswer };
