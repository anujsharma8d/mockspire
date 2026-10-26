const router = require("express").Router();
const { saveAnswer, submitAnswer } = require("../controllers/AnswerController")
const auth = require("../middleware/auth")

router.post("/",auth, saveAnswer)
router.post("/submit",auth, submitAnswer)

module.exports = router