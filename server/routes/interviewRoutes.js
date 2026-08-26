const router = require("express").Router();
const { getQuestions,startInterview,getSessionQuestions,getInterview } = require("../controllers/InterviewController");
const auth = require("../middleware/auth")

router.get('/',auth,getQuestions);
router.post("/start",auth,startInterview)

router.get("/:sessionId/questions",auth,getSessionQuestions)

router.get("/:sessionId",auth,getInterview)

module.exports = router