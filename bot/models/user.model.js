const db = require("../connections/db.connection");

const { DataTypes } = require("sequelize");

module.exports = db.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    category:{
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
    updateedAt: true,
});