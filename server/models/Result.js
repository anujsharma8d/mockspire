const mongoose = require("mongoose")

const ResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewSession",
        required: true,
        unique: true
    },
    overallScore: {
        type: Number,
        required: true
    },
    overallFeedback: {
        type: String,
        required: true
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        feedback: {
            type: String,
            required: true
        },
        idealAnswer: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true
    }

)

module.exports = mongoose.model("Result", ResultSchema)