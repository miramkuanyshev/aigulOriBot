const db = require('../../connections/db.connection');
const UserModel = require("../../models/user.model")
const {Op} = require("sequelize") 


const seachUser = async (name) => {
    await db.sync();
    return UserModel.findAll(
        {where:{
            firstname:{
                [Op.iLike]: name
            }
        }
    });
}

module.exports = seachUser;