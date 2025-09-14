const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure folders exist before saving
const ensureFolderExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadFolder = "uploads/";

        // Check request type to determine folder
        if (req.baseUrl.includes("categories")) {
            uploadFolder += "categories/";
        } else if (req.baseUrl.includes("products")) {
            uploadFolder += "products/";
        } else if (req.baseUrl.includes("customized")) {
            uploadFolder += "customized/";
        }
        else if (req.baseUrl.includes("images")) {
            uploadFolder += "generalImages/";
        }

        ensureFolderExists(uploadFolder); // Ensure folder exists
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

module.exports = upload;
