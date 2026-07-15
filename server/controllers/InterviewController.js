const InterviewQuestion = require("../models/InterviewQuestion");

const getQuestions = async(req,res)=>{
    try{
        const questions = await InterviewQuestion.find();

        res.status(200).json(questions);
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}

module.exports = {getQuestions};
