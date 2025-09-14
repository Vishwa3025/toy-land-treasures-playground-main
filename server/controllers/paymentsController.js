const Razorpay = require("razorpay");
const Order = require("../models/order");
const Payment = require("../models/payment");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const initiatePayment = async (req, res) => {
    const { order_id } = req.body;
    try {

        const order = await Order.findByPk(order_id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        const options = {
            amount: order.total_price * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}` // Short & unique
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Store in Payment table
        await Payment.create({
            order_id,
            rp_payment_id: razorpayOrder.id,
            amount: order.total_price,
            currency: "INR",
            status: "pending"
        });

        res.json({ success: true, order: razorpayOrder });
    } catch (error) {
        console.error(error);

        // ✅ Delete the order if it exists and payment creation failed
        if (order_id) {
            try {
                await Order.destroy({ where: { id: order_id } });
            } catch (deleteErr) {
                console.error("Failed to delete order:", deleteErr.message);
            }
        }
        res.status(500).json({ success: false, message: "Payment initiation failed" });
    }
};


const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Update Payment Table
        await Payment.update(
            { status: "paid", payment_id: razorpay_payment_id },
            { where: { order_id } }
        );

        // Update Order Status
        await Order.update({ status: "success" }, { where: { id: order_id } });

        res.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { initiatePayment, verifyPayment };
