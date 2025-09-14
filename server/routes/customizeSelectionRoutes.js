const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  getCategoriesOnly,
  getCustomizeSelectionByCategory,
  addOrUpdateCustomizeSelection,
  updateCustomizeSelection,
} = require("../controllers/customizeSelectionController");

router.get("/categories", authMiddleware, getCategoriesOnly);
router.get("/:category", authMiddleware, getCustomizeSelectionByCategory);
router.post("/add", authMiddleware, addOrUpdateCustomizeSelection);
router.post("/update", authMiddleware, updateCustomizeSelection);

module.exports = router;
