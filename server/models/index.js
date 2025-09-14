const sequelize = require("../config/db");

const User = require("./user");
const Category = require("./category");
const Product = require("./product");
const OrderItem = require("./orderItem");
const Order = require("./order");
const Cart = require("./cart");
const Payment = require("./payment");
const UserInfo = require("./userInfo");
const Images = require("./generalImages");
const CustomizeSelection = require("./customizeSelection");
const CustomizedProduct = require("./customizedProduct");




// Sync all models
const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true }); // Change to `{ force: true }` only for testing (WARNING: Drops all tables!)
        console.log("✅ Database synced successfully");
    } catch (err) {
        console.error("❌ Database sync error:", err);
    }
};

module.exports = {
    sequelize,
    syncDB,
    Category,
    User,
    Product,
    Order,
    OrderItem,
    Payment,
    Cart,
    UserInfo,
    Images,
    CustomizeSelection,
    CustomizedProduct
};
