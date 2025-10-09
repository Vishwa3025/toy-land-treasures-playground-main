const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");


// Get all products, with optional search
exports.getAllProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let where = {};
        if (search && search.trim() !== "") {
            // For Sequelize: use Op.like for partial match on name or description
            const { Op } = require("sequelize");
            where = {
                [Op.or]: [
                    { name: { [Op.iLike || Op.like]: `%${search}%` } },
                    { description: { [Op.iLike || Op.like]: `%${search}%` } }
                ]
            };
        }
        const products = await Product.findAll({ where });

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const productsWithImages = products.map(product => {
            const p = product.toJSON();
            return {
                ...p,
                image1: p.image1 ? `${baseUrl}/uploads/products/${p.image1}` : null,
                image2: p.image2 ? `${baseUrl}/uploads/products/${p.image2}` : null,
                image3: p.image3 ? `${baseUrl}/uploads/products/${p.image3}` : null,
                image4: p.image4 ? `${baseUrl}/uploads/products/${p.image4}` : null,
            };
        });

        res.json(productsWithImages);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const updatedProduct = {
            ...product.toJSON(),
            image1: product.image1 ? `${baseUrl}/uploads/products/${product.image1}` : null,
            image2: product.image2 ? `${baseUrl}/uploads/products/${product.image2}` : null,
            image3: product.image3 ? `${baseUrl}/uploads/products/${product.image3}` : null,
            image4: product.image4 ? `${baseUrl}/uploads/products/${product.image4}` : null,
        };

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, strikedPrice, price, discount, color, stock, category_id } = req.body;
        const images = req.files ? req.files.map((file) => file.filename) : [];
        const colorValue = Array.isArray(color) ? color.join(",") : color;
 
        // Basic validation
        if (!name || !strikedPrice || !price || !discount || !stock || !colorValue) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Assign up to 4 image filenames to respective columns
        const [image1, image2, image3, image4] = images;

        // Create new product
        const newProduct = await Product.create({
            id: uuidv4(), name, description, strikedPrice, price, discount, color: colorValue, stock, category_id,
            image1: image1 || null,
            image2: image2 || null,
            image3: image3 || null,
            image4: image4 || null, 
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newProduct
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Update a product by ID

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, strikedPrice, price, discount,color, stock, category_id } = req.body;
        const productId = req.params.id;

        // Find the existing product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const oldImage = product.image1; // Store the old image filename

        let newImage = oldImage; // Default to existing image

        // If a new image is uploaded
        if (req.file) {
            newImage = req.file.filename;

            // Delete old image before updating the database
            if (oldImage) {
                const oldImagePath = path.join(process.cwd(), "/uploads/products", product.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                } else {
                    console.error("Old image not found:", oldImagePath);
                }
            }
        }

        // Update product details in DB **after** deleting old image
        await product.update({ name, description, strikedPrice, price, discount, color, stock, category_id, image1: newImage });

        res.json({ success: true, message: "Product updated successfully", data: product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the existing product
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Delete the product
        await product.destroy();

        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
