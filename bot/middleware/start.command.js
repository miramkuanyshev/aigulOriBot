
const { bot } = require("../connections/token.connection");
const saveUser = require("../common/sequalize/saveUser");
const { Scenes, session } = require("telegraf");
const menuScene = require('../scenes/menu.scenes');

const stage = new Scenes.Stage([menuScene]);
    bot.use(session());
    bot.use(stage.middleware());
module.exports = bot.start(async (ctx) => {
    // Присваиваем значение переменным
    const login = String(ctx.chat.id);
    const username = ctx.chat.username ?? "anon";
    const firstName = ctx.update.message.chat.first_name;
    // сохраняем пользователя в базу данных
    await saveUser(login, username, firstName);
    // отправляем приветственное сообщение
    await ctx.replyWithPhoto({ source: 'bot/img/1.jpg' }, { caption: `✋🏼 Привет ${firstName}! \nМеня зовут Айгуль, сейчас я расскажу тебе о том как начать свой бизнес с нуля без вложений! \n \n Начну через 3... 2... 1...` })
    // оправляем отбивку и входим в главное меню 
    setTimeout(function () {
        ctx.reply("Начинаем 🔥")
        ctx.scene.enter("menuScene");
    }, 3000)
});