const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewSession",
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewQuestion",
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    evaluation: {
        correctness: {
            type: Number,
            min: 0,
            max: 10
        },
        depth: {
            type: Number,
            min: 0,
            max: 10
        },
        clarity: {
            type: Number,
            min: 0,
            max: 10
        },
        gaps: [String]
    }
}, {
    timestamps: true
});

AnswerSchema.index({ interviewId: 1, questionId: 1, user: 1 });
AnswerSchema.index({ interviewId: 1, user: 1 });

module.exports = mongoose.model("Answer", AnswerSchema);
