const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.cookies.token;

    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
