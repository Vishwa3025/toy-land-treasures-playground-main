const Cart = require("../models/cart");
const Product = require("../models/product");
const CustomizedProduct = require("../models/customizedProduct");

// ✅ Fetch all cart items for a specific user
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product, // Fetch product details for regular products
          as: "Product",
          attributes: ["id", "name", "price", "material", "image1"],
        },
        {
          model: CustomizedProduct, // Fetch customized product details
          as: "CustomizedProduct",
          attributes: [
            "id",
            "size",
            "material",
            "category",
            "color",
            "design_image_url",
          ], //
        },
      ],
      order: [["created_at", "ASC"]], // sort by created_at ascending
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formattedCartItems = cartItems.map((item) => {
      if (item.product_id) {
        // Regular product
        return {
          id: item.id,
          user_id: item.user_id,
          product_id: item.product_id,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          Product: item.Product
            ? {
                id: item.Product.id,
                name: item.Product.name,
                price: item.Product.price,
                material: item.Product.material,
                image1: item.Product.image1
                  ? `${baseUrl}/uploads/products/${item.Product.image1}`
                  : null,
              }
            : null,
        };
      } else if (item.customized_product_id) {
        // Customized product (no quantity here)
        return {
          id: item.id,
          user_id: item.user_id,
          customized_product_id: item.customized_product_id,
          size: item.size,
          quantity: item.quantity, // Quantity is handled in the cart level now
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          CustomizedProduct: item.CustomizedProduct
            ? {
                id: item.CustomizedProduct.id,
                size: item.CustomizedProduct.size,
                material: item.CustomizedProduct.material,
                color: item.CustomizedProduct.color,
                category: item.CustomizedProduct.category,
                design_image_url: item.CustomizedProduct.design_image_url
                  ? `${baseUrl}/uploads/customized/${item.CustomizedProduct.design_image_url}`
                  : null,
              }
            : null,
        };
      }
    });

    res.status(200).json(formattedCartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart." });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const {
      product_id,
      selectedSize,
      selectedColor,
      quantity,
      customized_product_id,
    } = req.body;
    const user_id = req.user.userId;

    if (!selectedSize) {
      return res.status(400).json({ message: "Size is required" });
    }
    if (!selectedColor) {
      return res.status(400).json({ message: "Color is required" });
    }

    // Ensure either product_id or customized_product_id is provided
    if (!product_id && !customized_product_id) {
      return res.status(400).json({
        message: "Either product_id or customized_product_id is required",
      });
    }

    // Check if it's a regular product or customized product
    let cartItem;
    if (product_id) {
      // Check if the regular product with size and color already exists in the cart
      cartItem = await Cart.findOne({
        where: {
          user_id,
          product_id,
          size: selectedSize,
          color: selectedColor,
        },
      });
    } else if (customized_product_id) {
      // Check if the customized product with size already exists in the cart
      cartItem = await Cart.findOne({
        where: { user_id, customized_product_id, size: selectedSize },
      });
    }

    if (cartItem) {
      // Update quantity if item already exists
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create a new cart item (either product or customized)
      cartItem = await Cart.create({
        user_id,
        product_id: product_id || null, // Set product_id for regular product
        customized_product_id: customized_product_id || null, // Set customized_product_id for custom product
        size: selectedSize,
        color: selectedColor,
        quantity,
      });
    }

    res.json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

const subtractFromCart = async (req, res) => {
  try {
    const { product_id, selectedSize, customized_product_id } = req.body;
    const user_id = req.user.userId;

    // Ensure either product_id or customized_product_id is provided
    if (!product_id && !customized_product_id) {
      return res
        .status(400)
        .json({
          message: "Either product_id or customized_product_id is required",
        });
    }

    // Find the specific item in the cart by either product_id or customized_product_id and size
    let cartItem;
    if (product_id) {
      // For regular product
      cartItem = await Cart.findOne({
        where: { user_id, product_id, size: selectedSize },
      });
    } else if (customized_product_id) {
      // For customized product
      cartItem = await Cart.findOne({
        where: { user_id, customized_product_id, size: selectedSize },
      });
    }

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Decrease quantity or remove the item
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      return res.json(cartItem);
    } else {
      // Remove the item if quantity becomes 0
      await cartItem.destroy();
      return res.json({ message: "Item removed from cart" });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Error updating cart" });
  }
};

// ✅ Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.destroy({ where: { id } });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Error removing item" });
  }
};

const clearCart = async (req, res) => {
  try {
    const user_id = req.user.userId;
    await Cart.destroy({ where: { user_id } });

    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Failed to clear cart." });
  }
};

module.exports = {
  getUserCart,
  addToCart,
  subtractFromCart,
  removeFromCart,
  clearCart,
};
