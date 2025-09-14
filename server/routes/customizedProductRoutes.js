const express = require("express");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");
const {
  addCustomizedToCart,
  getCustomizedCartItems,
  removeCustomizedFromCart,
} = require("../controllers/customizedProductController");


const router = express.Router();

router.post("/add", authMiddleware, upload.single("design_image"), addCustomizedToCart); // Add customized item to cart
router.get("/", authMiddleware, getCustomizedCartItems);  // Get all customized items in cart
router.delete("/:id", authMiddleware, removeCustomizedFromCart); // Remove one from cart

module.exports = router;
