require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize({
    user: 'mirambek',
    host: '94.241.138.78',
    database: 'aigulBase',
    password: '026347lm',
    port: 5432,
    dialect: 'postgres',
}
)

module.exports = db;