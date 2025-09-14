const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Users = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize's built-in UUID generator
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email_unique", // ✅ Prevent duplicate index creation
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "customer"),
        allowNull: false,
        defaultValue: "customer",
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,  // ✅ Fix for datetime issue
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,  // ✅ Fix for datetime issue
    },
}, {
    tableName: "users",
    timestamps: true, // Adds `createdAt` and `updatedAt`
    underscored: true, // Will use snake_case (created_at, updated_at)  
});

module.exports = Users;