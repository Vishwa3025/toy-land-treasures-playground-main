const Category = require("../models/category");
const Product = require("../models/product");
const upload = require("../middleware/uploadMiddleware")

// Get all Categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        const categoriesWithImages = categories.map(category => ({
            ...category.toJSON(),
            image: category.image ? `${req.protocol}://${req.get("host")}/uploads/categories/${category.image}` : null
        }));

        res.json(categoriesWithImages);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

// Get products under a specific category
exports.getProductsByCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: {
                model: Product,
                as: "Products", // Ensure this matches your Sequelize association
            },
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const productsWithFullImageUrls = category.Products.map(product => {
            const p = product.toJSON();
            return {
                ...p,
                image1: p.image1 ? `${baseUrl}/uploads/products/${p.image1}` : null,
                image2: p.image2 ? `${baseUrl}/uploads/products/${p.image2}` : null,
                image3: p.image3 ? `${baseUrl}/uploads/products/${p.image3}` : null,
                image4: p.image4 ? `${baseUrl}/uploads/products/${p.image4}` : null,
            };
        });

        res.json(productsWithFullImageUrls);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Add a new category
exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? req.file.filename : null; // Get uploaded file

        // Basic validation
        if (!name) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create new category
        const newCategory = await Category.create({ name, description, image });

        res.status(201).json({ success: true, message: "Category added successfully", data: newCategory });
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const categoryId = req.params.id;

        // Find the existing category
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Check if a new image is uploaded
        const image = req.file ? req.file.filename : category.image;

        // Update category details
        await category.update({ name, description, image });

        res.json({ success: true, message: "Category updated successfully", data: category });
    } catch (error) {
        console.error("Error updating Category:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Delete a product by ID
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Find the existing category
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, message: "category not found" });
        }

        // Delete the category
        await category.destroy();

        res.json({ success: true, message: "category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
