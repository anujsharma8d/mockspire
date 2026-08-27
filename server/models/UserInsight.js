const mongoose = require("mongoose")

const UserInsightSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    coreStrengths:[
        {
            name:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            }

        }
    ],
    focusAreas:[
        {
            name:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            }

        }
    ],
    basedOnInterviews: {
        type: Number,
        default: 0,
    },
},
{
    timestamps:true
}
)

module.exports = mongoose.model("UserInsight",UserInsightSchema)