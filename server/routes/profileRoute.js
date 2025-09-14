const express = require("express");
const authMiddleware = require("../middleware/auth");
const { getUserProfile, getAllUsers } = require("../controllers/profileController");

const router = express.Router();

router.get("/", authMiddleware, getUserProfile);
router.get("/all", authMiddleware, getAllUsers);

module.exports = router;