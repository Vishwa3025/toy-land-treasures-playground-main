const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define("OrderItem", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize's built-in UUID generator
        primaryKey: true
    },
    order_id: {
        type: DataTypes.UUID,
        references: {
            model: Order,
            key: "id",
        },
    },
    product_id: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: "id",
        },
        allowNull: true, // Product is optional, as it can be a customized product
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: "order_items",
    timestamps: false,
});

// Associations
OrderItem.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });

OrderItem.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE" });
Product.hasMany(OrderItem, { foreignKey: "product_id" });

module.exports = OrderItem;