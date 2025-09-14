const CustomizedProduct = require("../models/customizedProduct");
const Cart = require("../models/cart");

const addCustomizedToCart = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { size, material, color, category, quantity, description } = req.body;

    if (!size || !material || !color || !description || !category) {
      return res.status(400).json({ message: "Size, material, color, description, and category are required." });
    }

    // Extract uploaded image filename
    const design_image_url = req.file ? req.file.filename : null;

    const customizedProduct = await CustomizedProduct.create({
      user_id,
      size,
      material,
      color,
      description,
      design_image_url,
      quantity,
      category,
    });

    const cartItem = await Cart.create({
      user_id,
      customized_product_id: customizedProduct.id, 
      size,
      color,
      quantity,
    });

    res.status(201).json({
      message: "Customized product added to cart",
      cartItem,
    });
  } catch (error) {
    console.error("Error adding customized product to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ✅ Get all customized products from cart
const getCustomizedCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        {
          model: CustomizedProduct,
          as: "CustomizedProduct",
          attributes: ["id", "size", "material", "color", "category", "design_image_url", "quantity", "description"],
        },
      ],
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Only customized items and attach full image URL
    const customizedOnly = cartItems
      .filter(item => item.customized_product_id != null)
      .map(item => {
        const customized = item.CustomizedProduct?.toJSON();
        return {
          ...item.toJSON(),
          CustomizedProduct: {
            ...customized,
            design_image_url: customized?.design_image_url
              ? `${baseUrl}/uploads/customized/${customized.design_image_url}`
              : null,
          },
        };
      });

    res.status(200).json(customizedOnly);
  } catch (error) {
    console.error("Error fetching customized cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Remove specific customized product from cart
const removeCustomizedFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await Cart.destroy({ where: { id } });
    res.json({ message: "Customized product removed from cart" });
  } catch (error) {
    console.error("Error removing customized item:", error);
    res.status(500).json({ message: "Failed to remove customized item." });
  }
};

module.exports = {
  addCustomizedToCart,
  getCustomizedCartItems,
  removeCustomizedFromCart,
};
