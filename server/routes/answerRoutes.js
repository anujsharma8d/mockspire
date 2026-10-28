const router = require("express").Router();
const { saveAnswer, submitAnswer, submitAnswerStream } = require("../controllers/AnswerController");
const auth = require("../middleware/auth");

router.post("/", auth, saveAnswer);
router.post("/submit", auth, submitAnswer);
router.post("/submit-stream", auth, submitAnswerStream);

module.exports = router;
