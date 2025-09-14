const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import MySQL connection
const Category = require("./category"); // Import Category model


const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Sequelize's built-in UUID generator
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    strikedPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    category_id: {  
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Category,
            key: "id"
        },
        onDelete: "CASCADE",
    },
    isCombo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
    image1: {
        type: DataTypes.STRING, // Stores the image path or URL
        allowNull: false,
    },
    image2: {
        type: DataTypes.STRING, // Stores the image path or URL
        allowNull: true,
    },
    image3: {
        type: DataTypes.STRING, // Stores the image path or URL
        allowNull: true,
    },
    image4: {
        type: DataTypes.STRING, // Stores the image path or URL
        allowNull: true,
    },

}, {
    tableName: "products", // Matches your MySQL table name
    timestamps: true, //  Sequelize adds 'createdAt'
    underscored: true, // DB has snake_case column names (created_at)

});


// Define Relationship (1 Category has Many Products)
Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" });
Category.hasMany(Product, { foreignKey: "category_id" });

module.exports = Product;

