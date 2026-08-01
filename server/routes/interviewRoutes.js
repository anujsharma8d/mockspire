const router = require("express").Router();
const { getQuestions } = require("../controllers/InterviewController");
const auth = require("../middleware/auth")

router.get('/',auth,getQuestions);

module.exports = router