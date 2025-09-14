const CustomizeSelection = require("../models/customizeSelection");

// Controller: Get All Categories from All Rows
const getCategoriesOnly = async (req, res) => {
  try {
    const entries = await CustomizeSelection.findAll({
      attributes: ["category"], // only select category column
    });

    if (!entries || entries.length === 0) {
      return res.status(200).json({ categories: [] });
    }

    // Extract, split, and flatten categories from all rows
    let categories = entries
      .map(entry => entry.category || "")
      .flatMap(cat => cat.split(","))
      .map(v => v.trim())
      .filter(Boolean);

    // Remove duplicates
    categories = [...new Set(categories)];

    // Map to objects
    categories = categories.map(v => ({ value: v }));

    res.status(200).json({ categories });
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};


const getCustomizeSelectionByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const entry = await CustomizeSelection.findOne({ where: { category } });

    if (!entry) {
      return res.status(200).json({
        colors: [],
        materials: [],
        sizes: [],
      });
    }

    const colors = entry.color ? entry.color.split(",").filter(Boolean) : [];
    const materials = entry.material ? entry.material.split(",").filter(Boolean) : [];
    const sizes = entry.size ? entry.size.split(",").filter(Boolean) : [];

    res.status(200).json({ colors, materials, sizes });
  } catch (err) {
    console.error("Fetch category config error:", err);
    res.status(500).json({ message: "Failed to fetch category config" });
  }
};

// 🔹 Add single option (append logic)
const addOrUpdateCustomizeSelection = async (req, res) => {
  try {
    const { category, colors, materials, sizes } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required." });
    }

    // Convert arrays to comma-separated strings for storage
    const colorsStr = Array.isArray(colors) ? colors.join(",") : "";
    const materialsStr = Array.isArray(materials) ? materials.join(",") : "";
    const sizesStr = Array.isArray(sizes) ? sizes.join(",") : "";

    // Check if category config already exists
    let entry = await CustomizeSelection.findOne({ where: { category } });

    if (!entry) {
      // Create new config for category
      entry = await CustomizeSelection.create({
        category,
        color: colorsStr,
        material: materialsStr,
        size: sizesStr,
      });
      return res.status(201).json(entry);
    }

    // Update existing config for category
    await entry.update({
      color: colorsStr,
      material: materialsStr,
      size: sizesStr,
    });

    res.status(200).json(entry);
  } catch (err) {
    console.error("Add/Update error:", err);
    res.status(500).json({ message: "Failed to save category config" });
  }
};


// 🔹 Update full list (replace field with new array)
const updateCustomizeSelection = async (req, res) => {
  try {
    const { type, values } = req.body;

    if (!["size", "material", "color", "category"].includes(type)) {
      return res.status(400).json({ message: "Invalid type provided" });
    }

    if (!Array.isArray(values)) {
      return res.status(400).json({ message: "Values must be an array" });
    }

    let entry = await CustomizeSelection.findOne();

    // ✅ If no row exists, create one with default empty values
    if (!entry) {
      entry = await CustomizeSelection.create({
        size: "",
        material: "",
        category: "",
        color: "",
      });
    }

    entry[type] = values.join(",");
    await entry.save();

    res.status(200).json({
      message: `${type} updated successfully`,
      [type]: entry[type],
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update customize selection" });
  }
};

module.exports = {
  getCategoriesOnly,
  getCustomizeSelectionByCategory,
  addOrUpdateCustomizeSelection,
  updateCustomizeSelection,
};
