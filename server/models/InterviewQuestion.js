const mongoose = require("mongoose");

const InterviewQuestionSchema = new mongoose.Schema({
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewSession",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        enum: ["initial", "followup"],
        default: "initial"
    },
    followUps: [String]
});

InterviewQuestionSchema.index({ interviewId: 1 });
InterviewQuestionSchema.index({ role: 1, category: 1, difficulty: 1 });

module.exports = mongoose.model("InterviewQuestion", InterviewQuestionSchema);
