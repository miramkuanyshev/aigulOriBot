const { Scenes} = require("telegraf");
const getUser = require("../common/sequalize/getUser");


const adminScene = new Scenes.BaseScene('adminScene');

adminScene.enter(async (ctx) => {
    ctx.reply("Введите пароль для входа в Админ панель")
    
});

adminScene.on("message", async(ctx) => {
    const password = "qwerty43";

    if (ctx.message.text == password) {
        await ctx.replyWithPhoto({ source: 'bot/img/admin.jpg' }, {
            caption: `ВЫ ВОШЛИ В АДМИН-ПАНЕЛЬ БОТА`,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Посмотреть всех пользователей', callback_data: 'getAllUsers' }],
                    [{ text: 'Изменить категорию пользователя', callback_data: 'changeCategory' }],
                    [{ text: 'Найти пользователя по имени', callback_data: 'seachName' }],
                    [{ text: 'Найти пользователя по Эллиасу', callback_data: 'seachUsername' }],
                    [{ text: 'Рассылка', callback_data: 'sender' }]
                ]
            }
        })
    }

});

adminScene.action("getAllUsers", async(ctx)=>{
    const users =  await getUser();
    users.forEach(users => {
        let id = users.login;
        let firstname = users.firstname;
        let allias = users.username;
        let category = users.category;
        ctx.reply(`Пользователь: ${firstname}\nЭллиас пользователя: ${allias}\nУникальный ID пользователя: ${id}\nКатегория пользователя: ${category}`)
        
    });



})

module.exports = adminScene