const db = require('../../connections/db.connection');
const UserModel = require("../../models/user.model");


const getUser = async () => {
    const foundUser = await UserModel.findAll({
        raw: true,
    });

    return foundUser
}

module.exports = getUser;