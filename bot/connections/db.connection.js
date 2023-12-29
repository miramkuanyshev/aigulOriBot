require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize({
    user: 'gen_user',
    host: '94.241.138.78',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    dialect: 'postgres',
}
)

module.exports = db;