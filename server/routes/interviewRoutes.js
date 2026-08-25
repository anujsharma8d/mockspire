const router = require("express").Router();
const { getQuestions,startInterview,getSessionQuestions } = require("../controllers/InterviewController");
const auth = require("../middleware/auth")

router.get('/',auth,getQuestions);
router.post("/start",auth,startInterview)

router.get("/:sessionId/questions",auth,getSessionQuestions)

module.exports = router