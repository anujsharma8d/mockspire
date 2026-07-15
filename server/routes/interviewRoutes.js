const router = require("express").Router();
const { getQuestions } = require("../controllers/InterviewController");

router.get('/',getQuestions);

module.exports = router