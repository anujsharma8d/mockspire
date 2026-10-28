const InterviewQuestion = require("../models/InterviewQuestion");
const InterviewSession = require("../models/InterviewSession");
const { generateInterviewQuestions } = require("../services/geminiService");
const { getFallbackQuestion } = require("../services/fallbackQuestionBank");

const getQuestions = async (req, res) => {
    try {
        const questions = await InterviewQuestion.find().lean();

        res.status(200).json({
            questions
        });
    } catch (err) {
        console.error("getQuestions ERROR:", err);
        res.status(500).json({
            message: err.message,
        });
    }
};

const startInterview = async (req, res) => {
    try {
        const { interviewType, role, difficulty, questionCount } = req.body;
        console.log("Interview setup received:", { interviewType, role, difficulty, questionCount });

        if (!interviewType || !role || !difficulty || !questionCount) {
            return res.status(400).json({
                message: "All options are required"
            });
        }

        const prompt = `
            You are an expert interviewer.
            Generate exactly 1 interview question.

            Interview Type: ${interviewType}
            Role: ${role}
            Difficulty: ${difficulty}

            Requirements:
            1. Question must match the interview type.
            2. Question must be relevant to the selected role.
            3. Question must match the selected difficulty.
            4. Make the question a realistic interview question.
            5. Do not provide answers.
            6. Return ONLY valid JSON.

            Return exactly this format:
            {
                "questions": [
                    {
                        "question": "Question here"
                    }
                ]
            }
`;

        let initialQuestionText = null;

        try {
            console.log("Calling Gemini for initial question...");
            const generated = await generateInterviewQuestions(prompt);

            if (generated && generated.questions && Array.isArray(generated.questions) && generated.questions.length > 0) {
                initialQuestionText = generated.questions[0].question;
                console.log("Initial question generated via Gemini:", initialQuestionText);
            }
        } catch (aiErr) {
            console.warn("Gemini initial question generation failed or rate-limited. Using fallback question bank:", aiErr.message);
        }

        // If Gemini failed or didn't return a valid question, use curated fallback question
        if (!initialQuestionText) {
            const fallback = getFallbackQuestion({
                role,
                interviewType,
                difficulty
            });
            initialQuestionText = fallback.question;
            console.log("Initial question selected from fallback bank:", initialQuestionText);
        }

        const session = await InterviewSession.create({
            user: req.user.id,
            interviewType,
            role,
            difficulty,
            questionCount,
            questionsAsked: 0
        });
        console.log("Session created:", session._id);

        const questionDoc = await InterviewQuestion.create({
            interviewId: session._id,
            category: interviewType,
            role,
            difficulty,
            question: initialQuestionText,
            source: "initial"
        });

        session.questions = [questionDoc._id];
        await session.save();

        console.log("Initial question attached to session:", questionDoc._id);

        res.status(201).json({
            message: "Interview session created",
            sessionId: session._id
        });

    } catch (err) {
        console.error("startInterview error:", err);
        res.status(500).json({
            message: err.message
        });
    }
};

const getSessionQuestions = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user.id
        }).populate("questions");

        if (!session) {
            return res.status(404).json({
                message: "Interview session not found"
            });
        }

        res.status(200).json({
            questions: session.questions
        });

    } catch (err) {
        console.error("getSessionQuestions error:", err);
        res.status(500).json({
            message: err.message
        });
    }
};

const getFirstQuestion = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user.id
        }).populate("questions");

        if (!session) {
            return res.status(404).json({
                message: "Interview session not found"
            });
        }

        if (!session.questions || session.questions.length === 0) {
            return res.status(400).json({
                message: "No questions found for this interview"
            });
        }

        const firstQuestion = session.questions[0];

        // Ensure questionsAsked is at least 1 when first question is presented
        if (session.questionsAsked === 0) {
            session.questionsAsked = 1;
            await session.save();
        }

        console.log(`Question 1 of ${session.questionCount} displayed (max: ${session.questionCount})`);

        res.status(200).json({
            question: {
                _id: firstQuestion._id,
                question: firstQuestion.question,
                difficulty: firstQuestion.difficulty,
                category: firstQuestion.category
            },
            totalQuestions: session.questionCount,
            interviewDetails: {
                role: session.role,
                interviewType: session.interviewType
            }
        });

    } catch (err) {
        console.error("getFirstQuestion error:", err);
        res.status(500).json({
            message: err.message
        });
    }
};

const getInterview = async (req, res) => {
    try {
        const interview = await InterviewSession.findById(req.params.sessionId).lean();
        if (!interview) {
            return res.status(404).json({
                message: "Interview not found"
            });
        }

        res.status(200).json({
            interview
        });
    } catch (err) {
        console.error("getInterview error:", err);
        res.status(500).json({
            message: "Failed to fetch interview",
        });
    }
};

const updateInterviewDuration = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { duration } = req.body;

        const session = await InterviewSession.findOne({
            _id: sessionId,
            user: req.user.id
        });

        if (!session) {
            return res.status(404).json({
                message: "Interview session not found"
            });
        }

        session.duration = duration;
        await session.save();

        res.status(200).json({
            message: "Duration updated successfully"
        });

    } catch (err) {
        console.error("updateInterviewDuration error:", err);
        res.status(500).json({
            message: "Failed to update duration",
        });
    }
};

module.exports = {
    getQuestions,
    startInterview,
    getSessionQuestions,
    getInterview,
    getFirstQuestion,
    updateInterviewDuration
};
