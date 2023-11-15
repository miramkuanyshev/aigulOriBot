const { bot } = require("../../connections/token.connection");
const { Scenes, session } = require("telegraf");
const menuScene = require("../../scenes/menu.scenes");
const aboutScene = require("../../scenes/aboutBusines");
const joinScene = require("../../scenes/joinScene");
const adminScene = require("../../scenes/adminScene")


const stages = new Scenes.Stage([menuScene, aboutScene, joinScene, adminScene]);

bot.use(session());
bot.use(stages.middleware());

menuScene.use(stages.middleware());
aboutScene.use(stages.middleware());
joinScene.use(stages.middleware());
adminScene.use(stages.middleware())


module.exports = stages;

