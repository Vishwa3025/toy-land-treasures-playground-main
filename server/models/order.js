const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize's built-in UUID generator
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id",
        },
    }, 
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Success", "Accepted", "Delivered", "Cancelled"),
        defaultValue: "Pending",
    },
}, {
    tableName: "orders",
    timestamps: true,
    underscored: true
});

Order.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Order, { foreignKey: "user_id" });

module.exports = Order;