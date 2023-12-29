require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(
    process.env.POSTGRESQL_DATABASE,
    process.env.POSTGRESQL_USERNAME,
    process.env.POSTGRESQL_PASSWORD,
    {
        host: process.env.POSTGRESQL_HOST,
        port: process.env.POSTGRESQL_PORT,
        dialect: process.env.POSTGRESQL_DIALECT,

    },
)

module.exports = db;