const express = require("express");
const { initiatePayment, verifyPayment } = require("../controllers/paymentsController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/initiate", authMiddleware, initiatePayment);
router.post("/verify", authMiddleware, verifyPayment);

module.exports = router;
