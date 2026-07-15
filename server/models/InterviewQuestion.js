const mongoose = require("mongoose")

const InterviewQuestionSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true
    },
    difficulty:{
        type: String,
        required: true
    },
    question:{
        type:String,
        required:true,
    },
    followUps:[String]
})

module.exports = mongoose.model("InterviewQuestion",InterviewQuestionSchema);