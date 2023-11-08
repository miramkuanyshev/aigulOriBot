const { Scenes} = require("telegraf");


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
})


module.exports = menuScene