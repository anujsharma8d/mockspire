const Answer = require("../models/Answer")

const saveAnswer = async(req,res)=>{
    try{
        const {answers} = req.body

        const answerDocs = answers.map((item)=>({
            user:req.user.id,
            questionId:item.questionId,
            answer:item.answer
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