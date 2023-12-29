const { Scenes} = require("telegraf");
require ("../middleware/stage/stage");


const menuScene = new Scenes.BaseScene('menuScene');


menuScene.enter(async (ctx) => {
    console.log(ctx.update)
    let firstName;
    if (typeof ctx.update['message'] !== "undefined") {
        firstName = ctx.update.message.from.first_name;
    }else{
        firstName = ctx.update.callback_query.from.first_name;
    }       

    await ctx.replyWithPhoto({ source: 'bot/img/2.jpg' }, {
        caption: `${firstName}, выбери, что тебе интересно:`,
        reply_markup: {
            inline_keyboard: [
                [{ text: '👈 Что я предлагаю 👉', callback_data: 'whatThis' }],
                [{ text: '🤑 Как начать зарабатывать 🤑', callback_data: 'zarabotok' }],
                [{ text: '💰 Розыгрыш подарков 💰', url: 'https://chat.whatsapp.com/FIu83tENxnvHiQEiNAvLbm'}],
                [{ text: '🌏 Путешествия 🌏', callback_data: 'travel' }],
                [{ text: '📩 Хочу написать в лс 📩', url: 'https://t.me/AigulKuan' }]
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

menuScene.action('travel', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("travelScene");
});

menuScene.hears("/admin", async (ctx)=>{
    await ctx.scene.leave();
    await ctx.scene.enter("adminScene");
});

menuScene.on("message", async (ctx)=>{
    await ctx.reply('Я Вас непонимаю, нажмите на нужную кнопку!');
    await ctx.scene.reenter();
});



module.exports = menuScene;