const Answer = require("../models/Answer")
const InterviewSession = require("../models/InterviewSession")

const saveAnswer = async(req,res)=>{
    try{
        const {interviewId,answers,duration} = req.body

        const session = await InterviewSession.findOne({
            _id:interviewId,
            user:req.user.id
        })

        if(!session){
            return res.status(404).json({
                message:"Interview session not found"
            })
        }

        session.duration = duration

        await session.save()

        const answerDocs = answers.map((item)=>({
            user:req.user.id,
            interviewId,
            questionId:item.questionId,
            answer:item.answer,
        }))

        const newAnswers = await Answer.insertMany(answerDocs);

        res.status(201).json({
            message:"Answers submitted successfully",
            newAnswers
        })

    } catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports = { saveAnswer }