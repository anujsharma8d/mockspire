const router = require("express").Router()

const deleteAccount = require("../controllers/UserController.js");
const auth = require("../middleware/auth")


router.delete("/",auth,deleteAccount)

module.exports = router 