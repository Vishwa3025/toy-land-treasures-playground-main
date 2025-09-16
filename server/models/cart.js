const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Product = require("./product");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Product,
        key: "id",
      },
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
    underscored: true,
  }
);

// Relations
Cart.belongsTo(Product, {
  foreignKey: "product_id",
  as: "Product",
  onDelete: "CASCADE",
});
Product.hasMany(Cart, { foreignKey: "product_id" });

Cart.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Cart, { foreignKey: "user_id" });

module.exports = Cart;

