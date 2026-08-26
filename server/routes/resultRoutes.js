const router = require("express").Router()

const { generateResult,getResult,getRecentResults,getInterviewStats } = require("../controllers/ResultController")
const auth = require("../middleware/auth")

router.post("/",auth,generateResult)

router.get("/recent" , auth , getRecentResults)
router.get("/stats", auth, getInterviewStats);
router.get("/:interviewId" , auth , getResult)

module.exports = router
