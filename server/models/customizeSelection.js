const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CustomizeSelection = sequelize.define(
  "CustomizeSelection",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "customize_selections",
    timestamps: true,
    underscored: true,
  }
);

module.exports = CustomizeSelection;
