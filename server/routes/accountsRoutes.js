const express = require("express");
const authMiddleware = require("../middleware/auth");
const { updateUserAccount } = require("../controllers/accountsController")

const router = express.Router();

router.put("/update", authMiddleware, updateUserAccount);


module.exports = router;
