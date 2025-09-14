const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const CustomizedProduct = sequelize.define(
  "CustomizedProduct",
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
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    design_image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: { 
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "customized_products",
    timestamps: true,
    underscored: true,
  }
);

// Relation
CustomizedProduct.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(CustomizedProduct, { foreignKey: "user_id" });

module.exports = CustomizedProduct;
