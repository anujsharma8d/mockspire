const Answer = require("../models/Answer")
const InterviewSession = require("../models/InterviewSession")
const InterviewQuestion = require("../models/InterviewQuestion")
const { evaluateAnswerAndDetermineNext, generateCustomFollowUpQuestion } = require("../services/adaptiveInterviewService")
const { selectQuestionFromBank, createFollowUpQuestion, buildInterviewContext } = require("../services/questionSelectionService")

const saveAnswer = async(req,res)=>{
    try{
        const {interviewId,answers,duration} = req.body

        const session = await InterviewSession.findOne({
            _id:interviewId,
            user:req.user.id
        })

        if(!session){
            return res.status(404).json({
                message:"Interview session not found"
            })
        }

        session.duration = duration

        await session.save()

        const answerDocs = answers.map((item)=>({
            user:req.user.id,
            interviewId,
            questionId:item.questionId,
            answer:item.answer,
        }))

        const newAnswers = await Answer.insertMany(answerDocs);

        res.status(201).json({
            message:"Answers submitted successfully",
            newAnswers
        })

    } catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const submitAnswer = async(req,res)=>{
    try{
        const {interviewId, questionId, answer} = req.body

        // Validate answer
        if(!answer || answer.trim().length === 0){
            return res.status(400).json({
                message:"Answer cannot be empty"
            })
        }

        const session = await InterviewSession.findOne({
            _id:interviewId,
            user:req.user.id
        }).populate("questions")

        if(!session){
            return res.status(404).json({
                message:"Interview session not found"
            })
        }

        // Save the current answer
        const newAnswer = await Answer.create({
            user:req.user.id,
            interviewId,
            questionId,
            answer,
        })

        console.log("Answer saved:", newAnswer._id);

        // Get current question
        const currentQuestion = await InterviewQuestion.findById(questionId);
        
        if(!currentQuestion){
            return res.status(400).json({
                message:"Invalid question ID"
            })
        }

        // Get all previous answers for this interview
        const allAnswers = await Answer.find({
            interviewId,
            user: req.user.id
        }).sort({ createdAt: 1 });

        console.log(`Questions asked so far: ${session.questionsAsked}, Max allowed: ${session.questionCount}`);

        // Check if we've reached the maximum question limit
        // questionsAsked represents questions already displayed to candidate
        // We just saved an answer, so questionsAsked is still accurate
        const hasReachedQuestionLimit = session.questionsAsked >= session.questionCount;

        if(hasReachedQuestionLimit){
            console.log("Question limit reached, ending interview");
            return res.status(200).json({
                message:"Answer saved",
                isLastQuestion: true,
                answerId: newAnswer._id
            })
        }

        // Build interview context
        const context = await buildInterviewContext(session, allAnswers);

        console.log("Starting AI evaluation...");

        let evaluation;
        let nextQuestion = null;

        try {
            // AI evaluates the answer and determines next direction
            evaluation = await evaluateAnswerAndDetermineNext({
                currentQuestion: currentQuestion.question,
                candidateAnswer: answer,
                role: session.role,
                interviewType: session.interviewType,
                difficulty: session.difficulty,
                previousAnswers: context.previousAnswers,
                coveredTopics: context.coveredTopics
            });

            console.log("AI Evaluation:", {
                correctness: evaluation.correctness,
                depth: evaluation.depth,
                nextAction: evaluation.nextAction,
                shouldGenerateCustom: evaluation.shouldGenerateCustomQuestion
            });

            // Store evaluation data in the answer document for later use in results
            newAnswer.evaluation = {
                correctness: evaluation.correctness,
                depth: evaluation.depth,
                clarity: evaluation.clarity,
                gaps: evaluation.gaps || []
            };
            await newAnswer.save();

            // Decide whether to use question bank or generate custom question
            if (evaluation.shouldGenerateCustomQuestion) {
                console.log("Generating custom follow-up question...");
                
                try {
                    // Gather recent questions for duplicate prevention
                    const recentQuestions = [];
                    for (const ans of allAnswers.slice(-5)) {
                        const q = await InterviewQuestion.findById(ans.questionId);
                        if (q) {
                            recentQuestions.push(q.question);
                        }
                    }
                    // Add current question
                    recentQuestions.push(currentQuestion.question);

                    const customQ = await generateCustomFollowUpQuestion({
                        currentQuestion: currentQuestion.question,
                        candidateAnswer: answer,
                        nextAction: evaluation.nextAction,
                        suggestedTopic: evaluation.suggestedTopic,
                        gaps: evaluation.gaps,
                        role: session.role,
                        interviewType: session.interviewType,
                        difficulty: session.difficulty,
                        evaluation: {
                            correctness: evaluation.correctness,
                            depth: evaluation.depth,
                            clarity: evaluation.clarity
                        },
                        previousAnswers: context.previousAnswers,
                        recentQuestions: recentQuestions
                    });

                    // Save follow-up question to database
                    nextQuestion = await createFollowUpQuestion({
                        interviewId: session._id,
                        question: customQ.question,
                        topic: customQ.topic || evaluation.suggestedTopic,
                        role: session.role,
                        category: session.interviewType,
                        difficulty: session.difficulty
                    });

                    // Add to session's questions array
                    session.questions.push(nextQuestion._id);
                    await session.save();

                    console.log("Follow-up question created and added to session");

                } catch (customErr) {
                    console.error("Custom question generation failed, falling back to question bank:", customErr);
                    // Fall back to question bank if custom generation fails
                    evaluation.shouldGenerateCustomQuestion = false;
                }
            }

            // If not using custom question or custom generation failed, select from bank
            if (!evaluation.shouldGenerateCustomQuestion || !nextQuestion) {
                console.log("Selecting question from bank...");
                
                nextQuestion = await selectQuestionFromBank({
                    interviewId: session._id,
                    suggestedTopic: evaluation.suggestedTopic,
                    nextAction: evaluation.nextAction,
                    difficulty: session.difficulty,
                    role: session.role,
                    category: session.interviewType,
                    excludeQuestionIds: context.answeredQuestionIds,
                    gaps: evaluation.gaps
                });

                if (!nextQuestion) {
                    console.log("No matching question found in bank, using sequential fallback");
                    // Fallback: get any unused question from the session
                    const unusedQuestions = session.questions.filter(
                        q => !context.answeredQuestionIds.includes(q._id.toString())
                    );
                    
                    if (unusedQuestions.length > 0) {
                        nextQuestion = unusedQuestions[0];
                    } else {
                        // No more questions available
                        return res.status(200).json({
                            message:"Answer saved",
                            isLastQuestion: true,
                            answerId: newAnswer._id
                        })
                    }
                }
            }

        } catch (aiError) {
            console.error("AI evaluation failed, using fallback logic:", aiError);
            
            // Fallback: Sequential selection from question bank
            const unusedQuestions = session.questions.filter(
                q => !context.answeredQuestionIds.includes(q._id.toString())
            );

            if (unusedQuestions.length === 0) {
                return res.status(200).json({
                    message:"Answer saved",
                    isLastQuestion: true,
                    answerId: newAnswer._id
                })
            }

            // Use first unused question as fallback
            nextQuestion = unusedQuestions[0];
            console.log("Using fallback question:", nextQuestion._id);
        }

        // Increment questionsAsked since we're about to present a new question
        session.questionsAsked += 1;
        await session.save();

        console.log(`Question ${session.questionsAsked} of ${session.questionCount} will be displayed next`);

        // Return the next question to frontend
        res.status(200).json({
            message:"Answer saved",
            isLastQuestion: false,
            answerId: newAnswer._id,
            nextQuestion: {
                _id: nextQuestion._id,
                question: nextQuestion.question,
                difficulty: nextQuestion.difficulty,
                category: nextQuestion.category
            }
        })

    } catch(err){
        console.error("submitAnswer ERROR:", err);
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports = { saveAnswer, submitAnswer }