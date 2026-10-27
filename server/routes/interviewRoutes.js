const router = require("express").Router();
const { getQuestions,startInterview,getSessionQuestions,getInterview,getFirstQuestion,updateInterviewDuration } = require("../controllers/InterviewController");
const auth = require("../middleware/auth")

router.get('/',auth,getQuestions);
router.post("/start",auth,startInterview)

router.get("/:sessionId/questions",auth,getSessionQuestions)
router.get("/:sessionId/first-question",auth,getFirstQuestion)
router.patch("/:sessionId/duration",auth,updateInterviewDuration)

router.get("/:sessionId",auth,getInterview)

module.exports = router