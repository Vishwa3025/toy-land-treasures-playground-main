const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const UserInfo = sequelize.define("UserInfo", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize's built-in UUID generator
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,  //  Ensure only one address per user
        references: {
            model: User,
            key: "id",
        },
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_line1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_line2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postal_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
    tableName: "user_info",
});

// Define Associations
UserInfo.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(UserInfo, { foreignKey: "user_id" });

module.exports = UserInfo;
