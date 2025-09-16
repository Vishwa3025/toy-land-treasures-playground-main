const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");
const User = require("../models/user");
const nodemailer = require("nodemailer");

// ✅ Fetch all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              required: false,
              attributes: [
                "id",
                "name",
                "price",
                "color",
                "image1",
              ],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!orders.length) {
      return res
        .status(200)
        .json({ message: "No orders found for this user." });
    }

    // Format output like Cart
    const formattedOrders = orders.map((order) => {
      const formattedItems = order.OrderItems.map((item) => {
        if (item.product_id && item.Product) {
          return {
            id: item.id,
            quantity: item.quantity,
            subtotal: item.subtotal,
            product_id: item.product_id,
            Product: {
              id: item.Product.id,
              name: item.Product.name,
              price: item.Product.price,
              color: item.color,
              image1: item.Product.image1
                ? `${baseUrl}/uploads/products/${item.Product.image1}`
                : null,
            },
          };
        }
      });

      return {
        id: order.id,
        user_id: order.user_id,
        status: order.status,
        payment_method: order.payment_method,
        total_price: order.total_price,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        User: order.User,
        items: formattedItems,
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching orders." });
  }
};

// ✅ Fetch all orders for all users
const getOrders = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              required: false,
              attributes: [
                "id",
                "name",
                "price",
                "color",
                "image1",
              ],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!orders.length) {
      return res.status(200).json({ message: "No orders found." });
    }

    const formattedOrders = orders.map((order) => {
      const formattedItems = order.OrderItems.map((item) => {
        if (item.product_id && item.Product) {
          return {
            id: item.id,
            quantity: item.quantity,
            subtotal: item.subtotal,
            product_id: item.product_id,
            Product: {
              id: item.Product.id,
              name: item.Product.name,
              price: item.Product.price,
              color: item.Product.color,
              image1: item.Product.image1
                ? `${baseUrl}/uploads/products/${item.Product.image1}`
                : null,
            },
          };
        }
      });

      return {
        id: order.id,
        user_id: order.user_id,
        total_price: order.total_price,
        status: order.status,
        payment_method: order.payment_method,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        User: order.User,
        items: formattedItems,
      };
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders." });
  }
};

// ✅ Create a new order with items
const createOrder = async (req, res) => {
  try {
    const user_id = req.user.userId; // Ensure authentication middleware is in place
    const { items, payment_method } = req.body;

    if (!items || !items.length) {
      return res
        .status(400)
        .json({ message: "Order must contain at least one item." });
    }

    const total_price =
      items.reduce((sum, item) => sum + item.subtotal, 0) +
      (payment_method === "COD" ? 49 : 0); // Assuming a fixed delivery fee of 49 for COD

    // Create Order
    const newOrder = await Order.create({
      user_id,
      total_price,
      payment_method,
      status: "Pending",
    });

    // Create Order Items
    const orderItems = items.map((item) => ({
      order_id: newOrder.id,
      product_id: item.product_id || null, // Regular product
      quantity: item.quantity,
      color: item.color,
      category: item.category || null,
      subtotal: item.subtotal,
    }));

    await OrderItem.bulkCreate(orderItems);

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order." });
  }
};

// ✅ Fetch all order items for a given order
const getOrderItems = async (req, res) => {
  try {
    const { order_id } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const orderItems = await OrderItem.findAll({
      where: { order_id },
      include: [
        {
          model: Product,
          required: false,
          attributes: [
            "id",
            "name",
            "price",
            "color",
            "image1",
          ],
        },
      ],
    });

    if (!orderItems.length) {
      return res
        .status(404)
        .json({ message: "No items found for this order." });
    }

    const formattedItems = orderItems.map((item) => {
      if (item.product_id && item.Product) {
        return {
          id: item.id,
          quantity: item.quantity,
          subtotal: item.subtotal,
          product_id: item.product_id,
          Product: {
            id: item.Product.id,
            name: item.Product.name,
            price: item.Product.price,
            color: item.color,
            image1: item.Product.image1
              ? `${baseUrl}/uploads/products/${item.Product.image1}`
              : null,
          },
        };
      } else {
        return {
          id: item.id,
          quantity: item.quantity,
          subtotal: item.subtotal,
          message: "No product data found",
        };
      }
    });

    res.status(200).json(formattedItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ message: "Error fetching order items." });
  }
};

// ✅ Delete an order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.order_id;

    // Check if order exists and belongs to the current user
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });
    }

    // Optional: delete order items first if not set with CASCADE in the model
    await OrderItem.destroy({ where: { order_id: orderId } });

    // Delete the order
    await Order.destroy({ where: { id: orderId } });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Error deleting order" });
  }
};

// ✅ Update Order Status to Delivered
const updateDeliver = async (req, res) => {
  try {
    const { order_id } = req.params;

    await Order.update({ status: "Delivered" }, { where: { id: order_id } });

    res
      .status(200)
      .json({ message: "Order updated successfully", order: order_id });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order." });
  }
};

// ✅ Update Order Status to Cancelled
const cancelOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    await Order.update({ status: "Cancelled" }, { where: { id: order_id } });

    res
      .status(200)
      .json({ message: "Order Cancelled successfully", order: order_id });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order." });
  }
};

const acceptOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    // Get order first so we can find customer
    const order = await Order.findOne({
      where: { id: order_id },
      attributes: ["user_id"], // get the customer ID
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Fetch the customer's email
    const customer = await User.findOne({
      where: { id: order.user_id },
      attributes: ["email"],
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const email = customer.email; // now you have the customer's email

    console.log(email);

    const orderItems = await OrderItem.findAll({
      where: { order_id },
      include: [
        {
          model: Product,
          required: false,
          attributes: [
            "id",
            "name",
            "price",
            "color",
            "image1",
          ],
        },
      ],
    });

    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Build HTML for product details
    const productDetailsHtml = orderItems
      .map((item) => {
        const p = item.Product || item.CustomizedProduct;
        if (!p) return "";

        return `
          <tr>
            <td style="padding:8px; border:1px solid #ccc;">
              ${p.name || "-"}
            </td>
            <td style="padding:8px; border:1px solid #ccc;">
              ${item.color || "-"}
            </td>
            <td style="padding:8px; border:1px solid #ccc;">
              ${item.quantity || "-"}
            </td>
            <td style="padding:8px; border:1px solid #ccc;">
              ₹${p.price || 600.0 || "-"}
            </td>
          </tr>
        `;
      })
      .join("");

    const htmlContent = `
      <h2>Order Accepted</h2>
      <p>Your order has been accepted and is being processed. Thank you for shopping with us!</p>
      <h3>Order Details:</h3>
      <table style="border-collapse: collapse; border:1px solid #ccc;">
        <thead>
          <tr>
            <th style="padding:8px; border:1px solid #ccc;">Name</th>
            <th style="padding:8px; border:1px solid #ccc;">Color</th>
            <th style="padding:8px; border:1px solid #ccc;">Quantity</th>
            <th style="padding:8px; border:1px solid #ccc;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productDetailsHtml}
        </tbody>
      </table>
    `;

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, 
      subject: "Order Accepted",
      html: htmlContent,
    });

    // Update order status
    await Order.update({ status: "Accepted" }, { where: { id: order_id } });

    res.status(200).json({
      message: "Order acceptance email sent with product details",
      orderItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getUserOrders,
  createOrder,
  updateDeliver,
  getOrderItems,
  getOrders,
  deleteOrder,
  cancelOrder,
  acceptOrder,
};
