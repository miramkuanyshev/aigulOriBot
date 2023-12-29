const db = require('../../connections/db.connection');
const UserModel = require("../../models/user.model");


const getCategory = async () => {
    await db.sync();
    const foundUser = await UserModel.findAll({
        raw: true,
    });

    return Array.from(new Set(foundUser.map(el => el.category)));
}

module.exports = getCategory;