const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order");

const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, 
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    rp_payment_id: { // Razorpay Payment ID
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: "INR"
    },
    status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        defaultValue: "pending"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "payments",
    timestamps: false
});

// Define relationships
Payment.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });
Order.hasOne(Payment, { foreignKey: "order_id" });

module.exports = Payment;