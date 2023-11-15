const { bot } = require("../connections/token.connection");
require ('../middleware/stage/stage');

module.exports = bot.hears("message",  async (ctx) => {
    await ctx.reply("Ljf;bg;lj")
    await ctx.scene.enter("menuScene");
});