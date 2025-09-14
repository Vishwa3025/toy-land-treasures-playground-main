const express = require("express");
const { getUserOrders, createOrder, updateDeliver, getOrderItems, getOrders, deleteOrder,cancelOrder, acceptOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, getUserOrders);
router.get("/all", authMiddleware, getOrders);
router.post("/add", authMiddleware, createOrder);
router.put("/accept/:order_id", authMiddleware, acceptOrder);
router.put("/deliver/:order_id", updateDeliver);
router.delete("/:order_id", deleteOrder)
router.put("/cancel/:order_id", cancelOrder)
router.get("/:order_id/items", authMiddleware, getOrderItems);
module.exports = router;
