const mongoose = require("mongoose")

const InterviewSessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    interviewType:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    questionCount:{
        type:Number,
        required:true
    },
    duration:{
        type: String,
        default: "00:00",
        required:true
    },
    questions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InterviewQuestion"
        }
    ],
    status:{
        type:String,
        enum:["ongoing","completed"],
        default:"ongoing"
    }
},
{
    timestamps:true
}

)

module.exports = mongoose.model("InterviewSession",InterviewSessionSchema)