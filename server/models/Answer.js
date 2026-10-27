const mongoose = require("mongoose")

const AnswerSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    interviewId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"InterviewSession",
        required:true
    },
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewQuestion",
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    evaluation:{
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
},
{
    timestamps:true
}

)

module.exports = mongoose.model("Answer",AnswerSchema)