const express = require("express");
const router = express.Router();

const { createContact } = require("../controllers/ContactController");

router.post("/", createContact);

module.exports = router;