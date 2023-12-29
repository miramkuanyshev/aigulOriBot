const { bot } = require("../connections/token.connection");
require ('../middleware/stage/stage');

module.exports = bot.command("admin",  async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("adminScene");
});