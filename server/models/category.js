const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize's built-in UUID generator
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    image: {
        type: DataTypes.STRING, // Stores the image path or URL
        allowNull: false,
    },
}, {
    tableName: "categories",
    timestamps: false, // If you don’t have created_at & updated_at columns
});

module.exports = Category;
