const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const GeneralImage = sequelize.define("GeneralImage", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING, // Stores the image path or URL
        allowNull: false,
    }
}, {
    tableName: "general_images",
    timestamps: true, // Disable timestamps if not needed
});

module.exports = GeneralImage;
