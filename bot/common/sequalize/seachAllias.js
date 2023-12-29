const db = require('../../connections/db.connection');
const UserModel = require("../../models/user.model")
const {Op} = require("sequelize") 


const seachAllias = async (user) => {
    await db.sync();
    return UserModel.findAll(
        {where:{
            username:{
                [Op.iLike]: user
            }
        }
    });
}

module.exports = seachAllias;