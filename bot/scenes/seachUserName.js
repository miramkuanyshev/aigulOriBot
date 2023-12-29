const { Scenes} = require("telegraf");
const seachAllias = require('../common/sequalize/seachAllias');
const getCategory = require("../common/sequalize/getCategory");
const changeCategory = require("../common/sequalize/changeCategory");
require ("../middleware/stage/stage");

const seachUsernameScene = new Scenes.BaseScene('seachUsernameScene');

seachUsernameScene.enter(async (ctx) => {
    await ctx.replyWithHTML(`Введите аллиас пользователя:\n\n<b>UPD:</b> <i>Вводите текст после знака: <b>@</b></i>`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Меню администратора', callback_data: `adminMenu`}],
                [{ text: 'Главное меню', callback_data: `menu`}]
            ]
        }
    })
});

seachUsernameScene.on("message", async (ctx) => {
        const users = await seachAllias(ctx.message.text);

        if (users.length !== 0) {
            users.forEach(users=> {
                ctx.reply(`Пользователь: ${users.firstname}\nАллиас пользователя: ${users.username}\nУникальный ID пользователя: ${users.login}\nКатегория пользователя: ${users.category}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Изменить категорию пользователя', callback_data: `id${users.login}`}],
                            [{ text: 'Меню администратора', callback_data: `adminMenu`}],
                            [{ text: 'Главное меню', callback_data: `menu`}]
                        ]
                    }
                });
            })
        } else {
            await ctx.reply("Пользователь с таким аллиасом не найден!");
            await ctx.scene.reenter();
        }
})

seachUsernameScene.action(/^id/, async (ctx) => {
    console.log(ctx.update.callback_query.from.first_name);
    let userId = ctx.callbackQuery.data;
    const usersCategor = await getCategory();
    const category = [[{ text: `Новая категория`, callback_data: `newCategory|${userId.replace(/^id/, '')}` }], [{ text: `Вернуться в Админ-меню`, callback_data: `adminMenu` }]];
    usersCategor.forEach(el => {
            category.unshift([{ text: `${el}`, callback_data: `category|${el}|${userId.replace(/^id/, '')}` }]);
    });
    return ctx.reply(`Выберите новую котегорию для пользователя:`, {
        reply_markup: {
            inline_keyboard: category
        }
    });
});

seachUsernameScene.action(/^category/, async(ctx) =>{
    let data = ctx.callbackQuery.data.split("|");

    try {
        await changeCategory(data[2], data[1]);
        await ctx.reply (`Категория пользователя изменена на ${data[1]}`);
    } catch {
        await ctx.reply (`Что-то пошло не так`);
    }    
} );

seachUsernameScene.action(/^newCategory/, async(ctx) =>{
    await ctx.scene.leave();
    await ctx.scene.enter("newCategoryScene");
} );

seachUsernameScene.action(`adminMenu`, async(ctx) =>{
    await ctx.scene.leave();
    await ctx.scene.enter("adminScene");
} );

seachUsernameScene.action(`menu`, async(ctx) =>{
    await ctx.scene.leave();
    await ctx.scene.enter("menuScene");
} );

module.exports = seachUsernameScene