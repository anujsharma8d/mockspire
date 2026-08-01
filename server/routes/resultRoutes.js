const router = require("express").Router()

const { generateResult,getResult } = require("../controllers/ResultController")
const auth = require("../middleware/auth")

router.post("/",auth,generateResult)

router.get("/:interviewId" , auth , getResult)

module.exports = router
