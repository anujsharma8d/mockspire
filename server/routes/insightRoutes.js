const router = require("express").Router();
const { generateUserInsights,getUserInsights } = require("../controllers/InsightController")
const auth = require("../middleware/auth")

router.post("/generate",auth,generateUserInsights)

router.get("/",auth,getUserInsights)

module.exports = router;
