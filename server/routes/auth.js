require("dotenv").config();
const axios = require("axios")
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dns = require("dns");
const { v4: uuidv4 } = require("uuid");
const { log } = require("console");
const User = require("../models/user");


const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// const API_KEY = "321ad88be9394d08b8c6d5bb8e3ac50f"; // Replace with your actual API key
const API_KEY = "d0183b1d1d5c4d728ec09f649f9647e8"; // Replace with your actual API key


// Check if Email Domain Exists
const checkEmailDomain = (email) => {
    return new Promise((resolve, reject) => {
        const domain = email.split("@")[1];
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                return resolve(false);
            }
            resolve(true);
        });
    });
};

// Verify Email Exists Using API
const verifyEmailExists = async (email) => {
    const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`);
    return response.data.is_valid_format.value && response.data.deliverability === "DELIVERABLE";
};

// Register Route
router.post("/register", async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    log(req.body)

    // const domainExists = await checkEmailDomain(email);
    // if (!domainExists) {
    //     return res.status(400).json({ error: "Email domain does not exist." });
    // }

    // // Verify Email Exists (Optional API Check)
    // const emailExists = await verifyEmailExists(email);
    // if (!emailExists) {
    //     return res.status(400).json({ error: "This email does not exist or is not deliverable." });
    // }

    try {
        // Check if phone number exists using Sequelize's findOne method
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(400).json({ error: "Email Number already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user using Sequelize


        const newUser = await User.create({
            id: uuidv4(), // Generate UUID manually
            name,
            email,
            phone,
            password: hashedPassword,
            role: role || "customer" // Default role if not provided
        });

        res.json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

});

// Login Route
router.post("/login", async (req, res) => {
    try {
        // Find the user by email using Sequelize
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(404).json({ error: "Invalid Email" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: "5d" });

        // Send the token as an HTTP-Only Cookie
        res.cookie("token", token, {
            httpOnly: true,  // Ensure it's HTTP-only for security
            secure: process.env.NODE_ENV === 'production', // Set secure cookie only for HTTPS in production
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 60 * 60 * 1000, // ✅ 5 days in milliseconds
        });

        res.json({
            message: "Login Success",
            user,
            token,
            redirect: user.role === "admin" ? "/admin" : "/",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if email exists using Sequelize's findOne method
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Email not found!" });
        }

        // Generate a JWT token that expires in 15 minutes, using the user's password as a secret
        const secret = process.env.JWT_SECRET + user.password; // Use user's password hash for extra security
        const payload = { email: user.email };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });

        // Reset link (contains JWT token)
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${user.email}/${token}`;

        // Send email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset Your Password - LittledreamersToys",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #e76f51;">LittledreamersToys</h2>
                <p>Dear ${user.name || "User"},</p>
                <p>We received a request to reset your password. If you made this request, please click the button below to set a new password:</p>
                <p style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" style="background-color: #e76f51; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Reset Password
                    </a>
                </p>
                <p>This link will expire in 15 minutes for your security.</p>
                <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
                <br/>
                <p>Warm regards,<br/>TheLittledreamersToys</p>
                </div>
            `,
        };


        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error("Email error:", error);
                return res.status(500).json({ error: "Failed to send email!" });
            }

            // ✅ Successfully sent email, now return 200 response
            return res.status(200).json({ message: "Reset email sent! Check your inbox." });
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: err.message });
    }
});


router.post("/reset-password", async (req, res) => {
    const { email, token, password } = req.body;

    try {
        // Get the user by email using Sequelize's findOne method
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Invalid email!" });
        }

        // Verify token using the user's hashed password as part of the secret
        const secret = process.env.JWT_SECRET + user.password;
        jwt.verify(token, secret);

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database using Sequelize's update method
        await User.update(
            { password: hashedPassword },
            { where: { email } }
        );

        res.json({ message: "Password reset successfully!" });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Invalid or expired token!" });
    }
});


router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",  // Ensure it clears across all routes
    });

    res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;