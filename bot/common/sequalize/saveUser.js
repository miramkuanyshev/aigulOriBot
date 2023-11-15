const db = require('../../connections/db.connection');
const UserModel = require("../../models/user.model")


const saveUser = async (login, username, firstname) => {
    await db.sync();

    const foundUser = await UserModel.findOne({where:{login}});

    if (!foundUser){
        await UserModel.create({
            login,
            firstname,
            username,
            category: "new"
        })
        return
    }

    if (foundUser.username !== username) {
        await UserModel.update({username}, {where: {login}});
    }
}

module.exports = saveUser;