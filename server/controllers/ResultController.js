const Result = require("../models/Result")
const Answer = require("../models/Answer")
const InterviewSession = require("../models/InterviewSession");
const { generateInterviewFeedback } = require("../services/geminiService");
const mongoose = require("mongoose")

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

        const session = await InterviewSession.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!session) {
            return res.status(404).json({
                message: "Interview session not found",
            });
        }

        res.status(200).json({
            ...result.toObject(),
            duration: session.duration,
            createdAt: session.createdAt
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

const getRecentResults = async(req,res)=>{
    try{

        const sessions = await InterviewSession.find({
            user:req.user.id
        })
        .sort({createdAt:-1})
        .limit(5)

        const results = await Result.find({
            user:req.user.id
        })

        const recentResults = sessions.map((session)=>{
            const result = results.find((result)=>result.interviewId.toString() === session._id.toString())
            if(!result){
                return null
            }

            return {
                    _id: result._id,
                    role: session.role,
                    interviewId:session._id,
                    interviewType: session.interviewType,
                    date: session.createdAt,
                    duration: session.duration,
                    score: result.overallScore,
                    status: "Completed"
            }
        })
        .filter(Boolean)
        
        res.status(200).json({
            results:recentResults 
        })
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
}

const getInterviewStats = async(req,res)=>{
    try{
        const stats = await Result.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $group: {
                    _id: null,
                    totalInterviews: { $sum: 1 },
                    averageScore: { $avg: "$overallScore" }
                }
            }
        ]);

        const data = stats[0] || {
            totalInterviews: 0,
            averageScore: 0
        };
        res.status(200).json({
            totalInterviews: data.totalInterviews,
            averageScore: Math.round(data.averageScore),
        })
    }catch (err) {
        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { generateResult,getResult,getRecentResults,getInterviewStats };