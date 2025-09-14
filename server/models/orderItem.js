const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order");
const Product = require("./product");
const CustomizedProduct = require("./customizedProduct"); // Assuming this is your customized product model

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
    customized_product_id: {
        type: DataTypes.UUID,
        references: {
            model: CustomizedProduct,
            key: "id",
        },
        allowNull: true, // Customized product is optional, as it can be a regular product
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    design_image_url: {
        type: DataTypes.STRING,
        allowNull: true, // Design image URL is optional for regular products 
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: "order_items",
    timestamps: false,
    validate: {
        // Ensure that either product_id or customized_product_id is set, but not both.
        async productOrCustomized() {
            if (!this.product_id && !this.customized_product_id) {
                throw new Error("Either product_id or customized_product_id must be provided");
            }
            if (this.product_id && this.customized_product_id) {
                throw new Error("Cannot set both product_id and customized_product_id");
            }
        }
    }
});

// Associations
OrderItem.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });

OrderItem.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE" });
Product.hasMany(OrderItem, { foreignKey: "product_id" });

OrderItem.belongsTo(CustomizedProduct, { foreignKey: "customized_product_id", onDelete: "CASCADE" });
CustomizedProduct.hasMany(OrderItem, { foreignKey: "customized_product_id" });

module.exports = OrderItem;