const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Auth verification route (Protected)
router.get("/verify", authMiddleware, (req, res) => {
    res.json({ userId: req.user.userId, role: req.user.role });
});


//  Protected route (Only logged-in users can access)
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user });
});

// User Dashboard
router.get("/user-dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to User Dashboard!", user: req.user });
});

// Admin Dashboard
router.get("/admin-dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard!", user: req.user });
});



//  Protected Admin route (Only admins can access)
router.get("/admin", authMiddleware, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied. Admins only." });
    }
    res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
