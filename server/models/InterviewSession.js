const mongoose = require("mongoose")

const InterviewSessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
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