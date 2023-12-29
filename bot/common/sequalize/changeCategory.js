const db = require('../../connections/db.connection');
const UserModel = require("../../models/user.model")


const changeCategory = async (login, category) => {
    await db.sync();
    await UserModel.update({category}, {where: {login}});
}

module.exports = changeCategory