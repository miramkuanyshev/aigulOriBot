const { Scenes } = require("telegraf");
require("../middleware/stage/stage");


const travelScene = new Scenes.BaseScene('travelScene');

travelScene.enter(async (ctx) =>{
    await ctx.replyWithPhoto({ source: 'bot/img/bassein.jpg' }, {
        caption: `С Орифлеймом я начала путешествовать!`, 
        reply_markup: {
            inline_keyboard: [
                [{ text: '👈 Турция 👉', callback_data: 'tyrkey' }],
                [{ text: '🤑 Сочи 🤑', callback_data: 'sochi' }],
                [{ text: '💰 Санкт - Петербург 💰', callback_data: 'spb' }],
                [{ text: '🌏 Бамбуковый лес 🌏', callback_data: 'bambuk' }],
                [{ text: '📩 В МЕНЮ 📩', callback_data: 'menu' }]
            ]
        }
    })
});

travelScene.action('tyrkey', async (ctx) => {
    await ctx.replyWithPhoto({ source: 'bot/img/turk.jpg' }, {
        caption: `Турция`, 
        reply_markup: {
            inline_keyboard: [
                [{ text: '🤑 Сочи 🤑', callback_data: 'sochi' }],
                [{ text: '💰 Санкт - Петербург 💰', callback_data: 'spb' }],
                [{ text: '🌏 Бамбуковый лес 🌏', callback_data: 'bambuk' }],
                [{ text: '📩 В МЕНЮ 📩', callback_data: 'menu' }]
            ]
        }
    })
});

travelScene.action('sochi', async (ctx) => {
    await ctx.replyWithPhoto({ source: 'bot/img/sochi.jpg' }, {
        caption: `Сочи`, 
        reply_markup: {
            inline_keyboard: [
                [{ text: '👈 Турция 👉', callback_data: 'tyrkey' }],
                [{ text: '💰 Санкт - Петербург 💰', callback_data: 'spb' }],
                [{ text: '🌏 Бамбуковый лес 🌏', callback_data: 'bambuk' }],
                [{ text: '📩 В МЕНЮ 📩', callback_data: 'menu' }]
            ]
        }
    })
});

travelScene.action('spb', async (ctx) => {
    await ctx.replyWithPhoto({ source: 'bot/img/spb.jpg' }, {
        caption: `Санкт-Петербург`, 
        reply_markup: {
            inline_keyboard: [
                [{ text: '👈 Турция 👉', callback_data: 'tyrkey' }],
                [{ text: '🤑 Сочи 🤑', callback_data: 'sochi' }],
                [{ text: '🌏 Бамбуковый лес 🌏', callback_data: 'bambuk' }],
                [{ text: '📩 В МЕНЮ 📩', callback_data: 'menu' }]
            ]
        }
    })
});

travelScene.action('bambuk', async (ctx) => {
    await ctx.replyWithPhoto({ source: 'bot/img/les.jpg' }, {
        caption: `Где-то`, 
        reply_markup: {
            inline_keyboard: [
                [{ text: '👈 Турция 👉', callback_data: 'tyrkey' }],
                [{ text: '🤑 Сочи 🤑', callback_data: 'sochi' }],
                [{ text: '💰 Санкт - Петербург 💰', callback_data: 'spb' }],
                [{ text: '📩 В МЕНЮ 📩', callback_data: 'menu' }]
            ]
        }
    })
});

travelScene.action('menu', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter('menuScene');
});

travelScene.on("message", async (ctx)=>{
    await ctx.reply('Я Вас непонимаю, следуйте инструкциям!');
    await ctx.scene.reenter();
});

module.exports = travelScene;

