const Result = require("../models/Result");
const Answer = require("../models/Answer");
const InterviewSession = require("../models/InterviewSession");
const { generateInterviewFeedback } = require("../services/geminiService");
const mongoose = require("mongoose");

const generateResult = async (req, res) => {
    try {
        const { interviewId } = req.body;

        const answers = await Answer.find({
            interviewId,
            user: req.user.id
        }).populate("questionId");

        console.log("=== GENERATE RESULT ===");
        console.log("Total answers found:", answers.length);

        if (answers.length === 0) {
            return res.status(404).json({
                message: "No answers found"
            });
        }

        // Deduplicate answers: keep the latest answer for each unique question
        const uniqueAnswers = [];
        const seenQuestions = new Set();

        for (let i = answers.length - 1; i >= 0; i--) {
            const answer = answers[i];
            const qId = answer.questionId?._id?.toString() || answer.questionId?.toString();

            if (qId && !seenQuestions.has(qId)) {
                uniqueAnswers.unshift(answer);
                seenQuestions.add(qId);
            }
        }

        console.log("Using unique answers for grading:", uniqueAnswers.length);

        let prompt = `
            You are an experienced software interviewer.

            Evaluate each answer individually.
            Score each answer fairly based on technical accuracy, completeness, and clarity.

            For each question provide:
            - score (0-10)
            - feedback
            - idealAnswer

            Also provide:
            - overallScore (0-100)
            - overallFeedback

            Return ONLY valid JSON.
            Do not include markdown or explanations.

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

        uniqueAnswers.forEach((item, index) => {
            const qText = item.questionId?.question || "Question";
            prompt += `
            Question ${index + 1}: ${qText}
            Answer: ${item.answer}
            `;
        });

        let feedback = null;

        try {
            console.log("Calling Gemini for interview feedback...");
            feedback = await generateInterviewFeedback(prompt);
            console.log("Gemini feedback completed successfully");
        } catch (aiErr) {
            console.warn("Gemini feedback generation failed or rate limited. Synthesizing result from answer evaluations:", aiErr.message);
        }

        // Resilient fallback: calculate feedback from stored answer evaluations if AI was unavailable
        if (!feedback || !feedback.questions || !Array.isArray(feedback.questions)) {
            let totalScore = 0;
            const fallbackQuestions = uniqueAnswers.map((item, idx) => {
                const evalData = item.evaluation || {};
                const qScore = typeof evalData.correctness === 'number' ? Math.round(evalData.correctness) : 7;
                totalScore += qScore * 10;

                const gaps = evalData.gaps && evalData.gaps.length > 0 ? ` Areas to review: ${evalData.gaps.join(', ')}.` : '';

                return {
                    question: item.questionId?.question || `Question ${idx + 1}`,
                    answer: item.answer,
                    score: qScore,
                    feedback: `Your response demonstrated relevant knowledge with a depth rating of ${evalData.depth || 7}/10 and clarity of ${evalData.clarity || 7}/10.${gaps}`,
                    idealAnswer: "A complete, high-scoring answer clearly articulates the core concepts, gives practical examples, and addresses key trade-offs and edge cases."
                };
            });

            const overallScore = Math.min(100, Math.round(totalScore / (uniqueAnswers.length || 1)));

            feedback = {
                overallScore,
                overallFeedback: `Good effort across the interview session. You demonstrated good foundational knowledge with an overall score of ${overallScore}%. Review the individual question feedback to target specific improvement areas.`,
                questions: fallbackQuestions
            };
        }

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
        );

        await InterviewSession.findByIdAndUpdate(interviewId, {
            status: "completed"
        });

        console.log("Interview result saved successfully:", result._id);
        res.status(201).json(result);

    } catch (err) {
        console.error("Generate Result Error:", err);
        res.status(500).json({
            message: err.message
        });
    }
};

const getResult = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const result = await Result.findOne({
            interviewId,
            user: req.user.id
        }).lean();

        if (!result) {
            return res.status(404).json({
                message: "Result not found",
            });
        }

        const session = await InterviewSession.findOne({
            _id: interviewId,
            user: req.user.id
        }).lean();

        if (!session) {
            return res.status(404).json({
                message: "Interview session not found",
            });
        }

        res.status(200).json({
            ...result,
            duration: session.duration,
            createdAt: session.createdAt
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const getRecentResults = async (req, res) => {
    try {
        const totalsessions = await InterviewSession.find({
            user: req.user.id
        }).sort({ createdAt: -1 }).lean();

        const results = await Result.find({
            user: req.user.id
        }).lean();

        const resultMap = new Map(results.map(r => [r.interviewId.toString(), r]));

        const recentResults = totalsessions.map((session) => {
            const result = resultMap.get(session._id.toString());
            if (!result) {
                return null;
            }

            return {
                _id: result._id,
                role: session.role,
                interviewId: session._id,
                interviewType: session.interviewType,
                date: session.createdAt,
                duration: session.duration,
                score: result.overallScore,
                status: "Completed"
            };
        }).filter(Boolean);

        const limitedRecentResults = recentResults.slice(0, 5);

        res.status(200).json({
            allresults: recentResults,
            limitedresults: limitedRecentResults
        });
    } catch (err) {
        console.error("getRecentResults error:", err);
        res.status(500).json({
            message: err.message
        });
    }
};

const getInterviewStats = async (req, res) => {
    try {
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
            averageScore: Math.round(data.averageScore || 0),
        });
    } catch (err) {
        console.error("getInterviewStats error:", err);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = { generateResult, getResult, getRecentResults, getInterviewStats };
