const express = require("express");
const authMiddleware = require("../middleware/auth");
const { requestReturn } = require("../controllers/returnController"); // Import the return controller

const router = express.Router();

// Return request route
router.post("/request", authMiddleware, requestReturn);

module.exports = router;
