const { Scenes} = require("telegraf");
const markup = require('telegraf-markup4');

const joinScene = new Scenes.BaseScene('joinScene');


joinScene.enter (async (ctx) => {
    await ctx.reply('Добро пожаловать в супер-команду!👋🏻\nЕсли ты оказался в этом чате, значит у тебя есть мечты! Как минимум - это классная машинка, 🚗путешествия, 🏖здоровый образ жизни/молодость/красота 😍 или хотя бы жить, ни в чем себе не отказывая!\n😜Если это так, следуя этой инструкции, ты узнаешь, как осуществить все свои мечты! Поехали! 👍🏻');
    await new Promise ((resolve) => setTimeout(resolve, 70000));
    await ctx.reply("1️⃣Шаг.\nТот, кто тебя пригласил является твоим наставником и будет учить тебя всему, что умеет сам. Он создал тебе личный кабинет в компании Орифлэйм - это твой офис. Сейчас тебе нужно зайти на сайт www.oriflame.ru и ввести 4-х значный код, который пришёл на твой мобильный.");
    await new Promise ((resolve) => setTimeout(resolve, 50000));
    await ctx.reply("2️⃣ Шаг. Ничего себе, сколько здесь людей! Значит здесь действительно есть успех? - Конечно есть! Смотри эти истории до конца и делай выводы! 😉\nhttps://youtu.be/7as0bfBX70w\nhttps://youtu.be/ig43Ib52zwU");
    await ctx.reply("Потом тут может быть миллион сообщений друг за другом");
})

module.exports = joinScene;