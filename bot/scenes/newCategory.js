const { Scenes} = require("telegraf");
const changeCategory = require("../common/sequalize/changeCategory");
require ("../middleware/stage/stage");

const newCategoryScene = new Scenes.BaseScene('newCategoryScene');

let id;

newCategoryScene.enter(async (ctx) => {
    id = ctx.callbackQuery.data.split("|");
    await ctx.reply (`Введите назание новой категории`, {
        reply_markup: {
            inline_keyboard: [[{ text: `Назад`, callback_data: `back` }]]
        }
    });
})

newCategoryScene.on("message", async (ctx)=>{
    try {
        await changeCategory(id[1], ctx.message.text);
        await ctx.reply(`Категория пользователя успешно изменена на ${ctx.message.text}`);
        await ctx.scene.leave();
        await new Promise ((resolve) => setTimeout(resolve, 500));
        await ctx.reply('Сейчас вы будете перенаправлены в Админ - меню')
        await ctx.scene.enter("adminScene");
    }catch{
        await ctx.reply("Произошла онибка, попробуйте вернуться позже");
        await ctx.scene.leave();
        await new Promise ((resolve) => setTimeout(resolve, 500));
        await ctx.reply('Сейчас вы будете перенаправлены в Админ - меню')
        await ctx.scene.enter("adminScene");
    }

})

newCategoryScene.action('back',async (ctx)=>{
    await ctx.scene.leave();
    await new Promise ((resolve) => setTimeout(resolve, 500));
    await ctx.reply('Сейчас вы будете перенаправлены в Админ - меню')
    await ctx.scene.enter("adminScene");
})

module.exports = newCategoryScene;