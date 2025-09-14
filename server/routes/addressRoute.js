const express = require("express");
const { getUserAddress, createOrUpdateAddress } = require("../controllers/addressController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/:id", authMiddleware, getUserAddress);
router.post("/upsert", authMiddleware, createOrUpdateAddress);
router.put("/upsert", authMiddleware, createOrUpdateAddress);
module.exports = router;
