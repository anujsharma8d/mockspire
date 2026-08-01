const InterviewQuestion = require("../models/InterviewQuestion");
const InterviewSession = require("../models/InterviewSession");

const getQuestions = async (req, res) => {
    try {
        const questions = await InterviewQuestion.find();

        const session = await InterviewSession.create({
            user: req.user.id,
        })

        res.status(200).json({
            interviewId: session._id,
            questions
        });
    } catch (err) {
        console.error("getQuestions ERROR:");
        console.error(err);

        res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = { getQuestions };
