const Result = require("../models/Result")
const Answer = require("../models/Answer")
const InterviewSession = require("../models/InterviewSession");
const { generateInterviewFeedback } = require("../services/geminiService");

const generateResult = async (req, res) => {
    try {
        const { interviewId } = req.body

        const answers = await Answer.find({
            interviewId
        }).populate("questionId")

        console.log(answers.length);

        if (answers.length === 0) {
            return res.status(404).json({
                message: "No answers found"
            })
        }
        console.log("Answers fetched");

        let prompt = `
            You are an experienced software interviewer.

            Evaluate each answer individually.

            Score each answer fairly based on technical accuracy,
            completeness, and clarity.

            For each question provide:
            - score (0-10)
            - feedback
            - ideal answer

            Also provide:
            - overallScore (0-100)
            - overallFeedback

            Return ONLY valid JSON.
            Do not include markdown, code fences, or explanations.

            Return the JSON in this format:

            {
            "overallScore": 85,
            "overallFeedback": "...",
            "questions": [
                {
                "question": "...",
                "answer": "...",
                "score": 8,
                "feedback": "...",
                "idealAnswer": "..."
                }
            ]
            }
        `;

        answers.forEach((item, index) => {
            prompt += `
            Question ${index + 1}: ${item.questionId.question}

            Answer: ${item.answer}
            `
        })

        console.log("Calling Gemini...");
        const feedback = await generateInterviewFeedback(prompt);
        console.log("Gemini finished");
        console.log(feedback);

        const result = await Result.findOneAndUpdate(
            { interviewId },
            {
                interviewId,
                user: req.user.id,
                overallScore: feedback.overallScore,
                overallFeedback: feedback.overallFeedback,
                questions: feedback.questions,
            },
            {
                new: true,
                upsert: true,
            }
        )

        await InterviewSession.findByIdAndUpdate(interviewId, {
            status: "completed"
        });

        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getResult = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const result = await Result.findOne({
            interviewId,
            user: req.user.id
        })

        if (!result) {
            return res.status(404).json({
                message: "Result not found",
            });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = { generateResult,getResult };