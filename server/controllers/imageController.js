const GeneralImage = require("../models/generalImages");

// ✅ Fetch all images
const getAllImages = async (req, res) => {
    try {
        const images = await GeneralImage.findAll();

        // Append full URL to each image
        const imagesWithFullUrl = images.map(image => ({
            ...image.toJSON(),
            imageUrl: `${req.protocol}://${req.get("host")}/uploads/generalImages/${image.imageUrl}`
        }));

        res.status(200).json(imagesWithFullUrl);
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Error fetching images." });
    }
};

// ✅ Fetch a single image by ID
const getImageByTitle = async (req, res) => {
    try {
        const { title } = req.params; // Get title from request parameters

        const image = await GeneralImage.findOne({ where: { title } });

        if (!image) {
            return res.status(404).json({ message: "Image not found for the given title." });
        }

        // Append full URL
        const imageWithFullUrl = {
            ...image.toJSON(),
            imageUrl: `${req.protocol}://${req.get("host")}/uploads/generalImages/${image.imageUrl}`
        };

        res.status(200).json(imageWithFullUrl);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).json({ message: "Error fetching image." });
    }
};


// Create Image
const createImage = async (req, res) => {
    try {
        const { title } = req.body;
        const imageUrl = req.file ? req.file.filename : null; // Get uploaded file

        // Basic validation
        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required." });
        }

        // Create new image entry
        const newImage = await GeneralImage.create({ title, imageUrl });

        res.status(201).json({ success: true, message: "Image added successfully", data: newImage });
    } catch (error) {
        console.error("Error adding image:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


// ✅ Update an image
const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const image = req.file ? req.file.filename : null; // Store only filename

        const existingImage = await GeneralImage.findByPk(id);
        if (!existingImage) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        existingImage.title = title || existingImage.title;
        if (image) {
            existingImage.image = image; // Only update if a new file is uploaded
        }

        await existingImage.save();

        res.status(200).json({ success: true, message: "Image updated successfully", data: existingImage });
    } catch (error) {
        console.error("Error updating image:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = { updateImage };


// ✅ Delete an image
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await GeneralImage.findByPk(id);

        if (!image) {
            return res.status(404).json({ message: "Image not found." });
        }

        await image.destroy();
        res.status(200).json({ message: "Image deleted successfully." });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Error deleting image." });
    }
};

module.exports = { getAllImages, getImageByTitle, createImage, updateImage, deleteImage };
