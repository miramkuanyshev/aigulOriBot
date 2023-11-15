const { Scenes} = require("telegraf");
const markup = require('telegraf-markup4');


const aboutScene = new Scenes.BaseScene('aboutScene');

aboutScene.enter(async (ctx) => {
    await ctx.reply('Проект “Business-Prost” помогает своим партнерам по всему миру открывать online магазины и наполнять их лояльными потребителями и бизнес партнерами.\n🌟ЦЕЛЬ ПРОЕКТА:\nОказать помощь начинающим предпринимателям в построении высокодоходного бизнеса (с ежемесячной прибылью более 100 000 рублей) без вложений!\nОбучить современным методам ведения бизнеса в режиме onlinе, на примере крупной международной компании Oriflame.\n🌟ЗАДАЧА ПРOЕКТА:\n🔶Организовать привлечение новых партнеров, готовых обучаться с последующим официальным трудоустройством;\n🔷организовать получение новому партнеру статуса — индивидуальный предприниматель.\n🌟BUSINESS-PROST - ЭТО:\n🔶Современные методы ведения бизнеса online, не выходя из дома или совмещая с основной работой/учебой.\n🔷Более 50 успешных бизнес-тренеров.Обучение в форме вебинаров, видео-инструкции, шаблоны и презентации. Индивидуальное обучение от вышестоящего «спонсора».\n🔶Гибкий график работы.',
    markup.keyboard.reply([["Меню"]]));
    await new Promise ((resolve) => setTimeout(resolve, 5000));
    await ctx.reply("Лови небольшое видео\n Начинаю загрузку...");
    await ctx.replyWithVideo({
        source: 'bot/video/startScene.mp4',
        filename: 'start.mp4'
    });    
});

aboutScene.hears(['Меню'], async (ctx) => {
    await ctx.scene.leave();
    await new Promise ((resolve) => setTimeout(resolve, 1000));
    await ctx.scene.enter("menuScene");
});


module.exports = aboutScene