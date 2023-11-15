const { Scenes} = require("telegraf");
require ("../middleware/stage/stage");
const aboutScene = require('./aboutBusines');


const menuScene = new Scenes.BaseScene('menuScene');


menuScene.enter(async (ctx) => {
    const firstName = ctx.update.message.chat.first_name;
    await ctx.replyWithPhoto({ source: 'bot/img/2.jpg' }, {
        caption: `${firstName}, выбери, что тебе интересно:`,
        reply_markup: {
            inline_keyboard: [
                [{ text: '👈 Что я предлагаю 👉', callback_data: 'whatThis' }],
                [{ text: '🤑 Как начать зарабатывать 🤑', callback_data: 'zarabotok' }],
                [{ text: '💰 Мои доходы 💰', callback_data: 'myMoney' }],
                [{ text: '🌏 Путешествия 🌏', callback_data: 'travel' }],
                [{ text: '📩 Хочу написать в лс 📩', callback_data: 'adminMessage' }]
            ]
        }
    })
});

menuScene.action('whatThis', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("aboutScene");
});

menuScene.action('zarabotok', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("joinScene");
});

menuScene.hears(['Меню'], async (ctx) => {
    await ctx.reply("Вы находитесь в меню!");
    await ctx.scene.reenter();
});

menuScene.hears("/admin", async (ctx)=>{
    await ctx.scene.leave();
    await ctx.scene.enter("adminScene");
})


module.exports = menuScene;