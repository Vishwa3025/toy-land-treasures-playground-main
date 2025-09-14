const express = require("express");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");

const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();

// Define product routes
router.get("/", getAllProducts);
router.get("/:id",  getProductById); // Get a single product
router.post("/add", authMiddleware, upload.array("image", 4), addProduct); // Add a new product
router.put("/:id", authMiddleware, upload.single("image"), updateProduct); // Update a product
router.delete("/:id", authMiddleware, deleteProduct); //  Delete product route

module.exports = router;
