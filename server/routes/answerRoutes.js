const router = require("express").Router();
const { saveAnswer } = require("../controllers/AnswerController")
const auth = require("../middleware/auth")

router.post("/",auth, saveAnswer)

module.exports = router