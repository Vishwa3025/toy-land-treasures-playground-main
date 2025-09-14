const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres", // or 'mysql', 'sqlite', etc.
        port: process.env.DB_PORT || 5432, // Default PostgreSQL port
        // port: process.env.DB_PORT || 3306,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
        },
        logging: false,
    }
);

module.exports = sequelize;