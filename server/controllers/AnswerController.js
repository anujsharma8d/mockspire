const Answer = require("../models/Answer")
const InterviewSession = require("../models/InterviewSession")
const InterviewQuestion = require("../models/InterviewQuestion")

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

const submitAnswer = async(req,res)=>{
    try{
        const {interviewId, questionId, answer} = req.body

        const session = await InterviewSession.findOne({
            _id:interviewId,
            user:req.user.id
        }).populate("questions")

        if(!session){
            return res.status(404).json({
                message:"Interview session not found"
            })
        }

        // Save the current answer
        const newAnswer = await Answer.create({
            user:req.user.id,
            interviewId,
            questionId,
            answer,
        })

        // Find current question index
        const currentQuestionIndex = session.questions.findIndex(
            q => q._id.toString() === questionId
        )

        if(currentQuestionIndex === -1){
            return res.status(400).json({
                message:"Invalid question ID"
            })
        }

        // Check if this is the last question
        const isLastQuestion = currentQuestionIndex === session.questions.length - 1

        if(isLastQuestion){
            return res.status(200).json({
                message:"Answer saved",
                isLastQuestion: true,
                answerId: newAnswer._id
            })
        }

        // Get next question (sequential for now)
        const nextQuestion = session.questions[currentQuestionIndex + 1]

        res.status(200).json({
            message:"Answer saved",
            isLastQuestion: false,
            answerId: newAnswer._id,
            nextQuestion: {
                _id: nextQuestion._id,
                question: nextQuestion.question,
                difficulty: nextQuestion.difficulty,
                category: nextQuestion.category
            }
        })

    } catch(err){
        console.error("submitAnswer ERROR:", err);
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports = { saveAnswer, submitAnswer }