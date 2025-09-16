const Cart = require("../models/cart");
const Product = require("../models/product");

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
          attributes: ["id", "name", "price", "image1"],
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
          color: item.color,
          quantity: item.quantity,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          Product: item.Product
            ? {
                id: item.Product.id,
                name: item.Product.name,
                price: item.Product.price,
                image1: item.Product.image1
                  ? `${baseUrl}/uploads/products/${item.Product.image1}`
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
      selectedColor,
      quantity,
    } = req.body;
    const user_id = req.user.userId;

    if (!selectedColor) {
      return res.status(400).json({ message: "Color is required" });
    }

    // Ensure product_id is provided
    if (!product_id) {
      return res.status(400).json({
        message: "product_id is required",
      });
    }

    // Check if it's a regular product
    let cartItem;
    if (product_id) {
      // Check if the regular product color already exists in the cart
      cartItem = await Cart.findOne({
        where: {
          user_id,
          product_id,
          color: selectedColor,
        },
      });
    }

    if (cartItem) {
      // Update quantity if item already exists
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create a new cart item
      cartItem = await Cart.create({
        user_id,
        product_id: product_id || null, // Set product_id for regular product
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
    const { product_id } = req.body;
    const user_id = req.user.userId;

    // Ensure product_id is provided
    if (!product_id) {
      return res
        .status(400)
        .json({
          message: "product_id is required",
        });
    }

    // Find the specific item in the cart by either product_id 
    let cartItem;
    if (product_id) {
      // For regular product
      cartItem = await Cart.findOne({
        where: { user_id, product_id},
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
