const { bot } = require("../../connections/token.connection");
const { Scenes, session } = require("telegraf");
const menuScene = require("../../scenes/menu.scenes");
const aboutScene = require("../../scenes/aboutBusines");
const joinScene = require("../../scenes/joinScene");
const adminScene = require("../../scenes/adminScene");
const seachNameScene = require("../../scenes/seachNameScene");
const newCategoryScene = require("../../scenes/newCategory");
const seachUsernameScene = require("../../scenes/seachUserName");
const senderScene = require("../../scenes/sender");
const travelScene = require("../../scenes/travelScene");
const { Postgres } = require('@telegraf/session/pg');


const store = Postgres({
    user: 'gen_user',
    host: '94.241.138.78',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    dialect: 'postgres',
});


bot.use(session({ store }));
const stages = new Scenes.Stage([menuScene, aboutScene, joinScene, adminScene, seachNameScene, newCategoryScene, seachUsernameScene, senderScene, travelScene]);
bot.use(stages.middleware());


module.exports = stages;

