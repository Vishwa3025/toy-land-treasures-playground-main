const express = require("express");
const { getUserCart, addToCart, removeFromCart, subtractFromCart, clearCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, getUserCart); // Fetch cart items
router.post("/add", authMiddleware, addToCart); // Add regular product to cart
router.post("/add-customized", authMiddleware, addToCart); // Add customized product to cart (new route)
router.post("/subtract", authMiddleware, subtractFromCart); // Subtract item from cart
router.post("/subtract-customized", authMiddleware, subtractFromCart); // Subtract item from cart (customized)
router.delete("/clear", authMiddleware, clearCart);
router.delete("/:id", authMiddleware, removeFromCart); // Remove item from cart

module.exports = router;
