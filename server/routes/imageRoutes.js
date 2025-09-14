const express = require("express");
const { getAllImages, getImageByTitle, createImage, updateImage, deleteImage } = require("../controllers/imageController");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware")

const router = express.Router();

router.get("/", getAllImages);
router.get("/title/:title", getImageByTitle);
router.post("/add", authMiddleware, upload.single("image"), createImage);
router.put("/:id", authMiddleware, upload.single("image"), updateImage);
router.delete("/:id", authMiddleware, deleteImage);

module.exports = router;
