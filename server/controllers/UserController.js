const deleteAccountService = require('../services/deleteAccountService')

const deleteAccount = async(req,res) => {
    try{
        const userId = req.user.id

        await deleteAccountService(userId)

        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

module.exports = deleteAccount
