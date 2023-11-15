
const { bot } = require("../connections/token.connection");
const saveUser = require("../common/sequalize/saveUser");
require ('../middleware/stage/stage');



module.exports = bot.start(async (ctx) => {
   try {
     // Присваиваем значение переменным
     const login = String(ctx.chat.id);
     const username = ctx.chat.username ?? "anon";
     const firstname = ctx.update.message.chat.first_name;
     // сохраняем пользователя в базу данных
     await saveUser(login, username, firstname);
     // отправляем приветственное сообщение
     await ctx.replyWithPhoto({ source: 'bot/img/1.jpg' }, { caption: `✋🏼 Привет ${firstname}! \nМеня зовут Айгуль, сейчас я расскажу тебе о том как начать свой бизнес с нуля без вложений! \n \n Начну через 3... 2... 1...` });
     // оправляем отбивку и входим в главное меню 
     setTimeout(async function () {
         await ctx.reply("Начинаем 🔥");
         await ctx.scene.enter("menuScene");
     }, 3000)
   } catch {
    await ctx.reply("Что-то пошло не так")
   }
});