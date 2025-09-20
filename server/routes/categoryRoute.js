const express = require("express");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware")

const {
    getAllCategories,
    getCategoryById,
    getProductsByCategory,
    addCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();


// Define category routes
router.get("/", getAllCategories); // Get all categories
router.get("/:id/products", getProductsByCategory); // Get products under a category
router.post("/add", authMiddleware, upload.single("image"), addCategory); // Add a new category
router.put("/:id", authMiddleware, upload.single("image"), updateCategory); // Update a category
router.delete("/:id", authMiddleware, deleteCategory); // Delete a category

module.exports = router;
