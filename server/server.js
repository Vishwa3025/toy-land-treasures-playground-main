const express = require("express");
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize, syncDB } = require("./models"); // ✅ Import all models
const protectedRoutes = require("./routes/protected");
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const profileRoutes = require("./routes/profileRoute");
const orderRoutes = require("./routes/orderRoute");
const addressRoutes = require("./routes/addressRoute");
const accountsRoutes = require("./routes/accountsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/auth");
const returnRoutes = require("./routes/returnRoutes");

const app = express();


// Configure CORS to allow requests from frontend
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ Allow cookies and authentication headers
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // For form data (optional)

//  Images
app.use("/uploads", express.static("uploads"));

// Test MySQL Connection
sequelize.authenticate()
    .then(() => console.log("✅ MySql Connected via Sequelize"))
    .catch(err => console.error("❌ MySql Connection Error:", err));


syncDB(); // ✅ Sync all models from `models/index.js`


// Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/profile", profileRoutes);
app.use("/address", addressRoutes);
app.use("/account", accountsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/return", returnRoutes)

// Serve React static files
// app.use(express.static(path.join(__dirname, 'client/dist')));


// // Fallback for SPA routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/dist/index.html'));
// });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
