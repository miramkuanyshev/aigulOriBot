const { bot } = require("../connections/token.connection");
require ('../middleware/stage/stage');

module.exports = bot.command("/admin",  async (ctx) => {
    await ctx.reply("Ljf;bg;lj")
});