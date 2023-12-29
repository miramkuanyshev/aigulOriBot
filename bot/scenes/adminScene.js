const { Scenes } = require("telegraf");
const getUser = require("../common/sequalize/getUser");
const changeCategory = require("../common/sequalize/changeCategory");
const getCategory = require("../common/sequalize/getCategory");
require("../middleware/stage/stage");


const adminScene = new Scenes.BaseScene('adminScene');

adminScene.enter(async (ctx) => {
    ctx.reply("Введите пароль для входа в Админ панель")

});

adminScene.on("message", async (ctx) => {
    const password = "qwerty43";

    if (ctx.message.text == password) {
        await ctx.replyWithPhoto({ source: 'bot/img/admin.jpg' }, {
            caption: `ВЫ ВОШЛИ В АДМИН-ПАНЕЛЬ БОТА`,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Посмотреть всех пользователей', callback_data: 'getAllUsers' }],
                    [{ text: 'Найти пользователя по имени', callback_data: 'seachName' }],
                    [{ text: 'Найти пользователя по Аллиасу', callback_data: 'seachUsername' }],
                    [{ text: 'Рассылка', callback_data: 'sender' }],
                    [{ text: 'Выйти в основное меню', callback_data: 'menu' }]
                ]
            }
        })
    } else {
        await ctx.reply("Пароль неверен, попробуй еще разок дружок");
        await ctx.scene.reenter();
    }

});

adminScene.action("getAllUsers", async (ctx) => {
    try {
        const users = await getUser();
        users.forEach(function (users, index) {
            setTimeout(function () {
                let id = users.login;
                let firstname = users.firstname;
                let allias = users.username;
                let category = users.category;
                ctx.reply(`Пользователь: ${firstname}\nЭллиас пользователя: ${allias}\nУникальный ID пользователя: ${id}\nКатегория пользователя: ${category}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Изменить категорию пользователя', callback_data: `id${users.login}` }]
                        ]
                    }
                });
            }, index * 1000);
        });

    } catch {
        await ctx.reply ('Проблемы с подключением к базе данных');

    }
        
});

adminScene.action(/^id/, async (ctx) => {
    try {
        let userId = ctx.callbackQuery.data;
        const usersCategor = await getCategory();
        const category = [[{ text: `Новая категория`, callback_data: `newCategory|${userId.replace(/^id/, '')}` }], [{ text: `Вернуться в Админ-меню`, callback_data: `back` }]];
        usersCategor.forEach(el => {
                category.unshift([{ text: `${el}`, callback_data: `category|${el}|${userId.replace(/^id/, '')}` }]);
        });
        return ctx.reply(`Выберите новую котегорию для пользователя:`, {
            reply_markup: {
                inline_keyboard: category
            }
        });
    } catch {
        await ctx.reply ('Проблемы с подключением к базе данных');
    }
    
});

adminScene.action(/^category/, async(ctx) =>{
    let data = ctx.callbackQuery.data.split("|");

    try {
        await changeCategory(data[2], data[1]);
        await ctx.reply (`Категория пользователя изменена на ${data[1]}`);
    } catch {
        await ctx.reply (`Что-то пошло не так`);
    }    
} );

adminScene.action(/^newCategory/, async(ctx) =>{
    await ctx.scene.leave();
    await ctx.scene.enter("newCategoryScene");
} );

adminScene.action('seachName', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("seachNameScene");
})

adminScene.action('menu', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("menuScene");
});
adminScene.action('back', async (ctx) => {
    await ctx.scene.reenter();
})

adminScene.action('seachUsername', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("seachUsernameScene");
});

adminScene.action('sender', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter("senderScene");
});

adminScene.on("message", async (ctx)=>{
    await ctx.reply('Я Вас непонимаю, следуйте инструкциям!');
    await ctx.scene.reenter();
});


module.exports = adminScene