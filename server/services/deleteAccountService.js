const mongoose = require("mongoose")
const Answer = require('../models/Answer');
const Result =  require('../models/Result');
const UserInsight = require('../models/UserInsight');
const InterviewQuestion = require('../models/InterviewQuestion');
const InterviewSession = require('../models/InterviewSession');
const User = require('../models/User');

const deleteAccountService = async(userId) => {

    const session = await mongoose.startSession()
    try{
        await session.withTransaction(async()=>{
            await InterviewQuestion.deleteMany({user: userId}).session(session);
            await Answer.deleteMany({user: userId}).session(session);
            await Result.deleteMany({user: userId}).session(session);
            await UserInsight.deleteMany({user: userId}).session(session);
            await InterviewSession.deleteMany({user: userId}).session(session);
            await User.findByIdAndDelete(userId).session(session);
        })
        return true
    }
    finally{
        await session.endSession()
    }
    
}

module.exports = deleteAccountService
