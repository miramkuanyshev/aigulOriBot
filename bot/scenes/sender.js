const { Scenes } = require("telegraf");
const sender = require('telegraf-sender');
const getCategory = require("../common/sequalize/getCategory");
const getUser = require("../common/sequalize/getUser");


const senderScene = new Scenes.BaseScene('senderScene');
let sendObj = {
    users: [],
    isCopy: false,
    message: {
        type: 'text',
        text: '',
        extra: { parse_mode: 'HTML' },
    }
};

senderScene.enter(async (ctx) => {
    await ctx.replyWithPhoto({ source: 'bot/img/admin.jpg' }, {
        caption: `ВЫ ВОШЛИ В СЦЕНУ РАССЫЛКИ\nВыберите тип сообщения`,
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Текстовое сообщение', callback_data: 'text' }],
                [{ text: 'Сообщение с картинкой', callback_data: 'image' }],
                [{ text: 'Сообщение с видео', callback_data: 'video' }],
                [{ text: 'Круглое видео', callback_data: 'videoNote' }]

            ]
        }
    })
});


senderScene.action('text', async (ctx) => {
    delete sendObj.message.file_id;
    delete sendObj.message.extra.caption;
    sendObj.message = {
        type: 'text',
        text: '',
        extra: { parse_mode: 'HTML' },
    };
    ctx.reply("Пришлите сообщение")
})

senderScene.action('image', async (ctx) => {
    delete sendObj.message.text;
    sendObj.message = {
        type: 'photo',
        file_id: '',
        extra: { parse_mode: 'HTML', caption: '' },
    }

    ctx.reply("Пришлите сообщение")
})

senderScene.action('video', async (ctx) => {
    delete sendObj.message.text;
    sendObj.message = {
        type: 'video',
        file_id: '',
        extra: { parse_mode: 'HTML', caption: '' },
    }

    ctx.reply("Пришлите сообщение")
})

senderScene.action('videoNote', async (ctx) => {
    delete sendObj.message.text;
    sendObj.message = {
        type: 'video_note',
        file_id: '',
        extra: { parse_mode: 'HTML', caption: '' },
    }

    ctx.reply("Пришлите сообщение")
})

senderScene.on('message', async (ctx) => {
    try{
        if (sendObj.message.type == 'text') {
            sendObj.message.text = ctx.message.text;
        } else if (sendObj.message.type == 'photo') {
            sendObj.message.extra.caption = ctx.message.caption;
            sendObj.message.file_id = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        } else if (sendObj.message.type == 'video') {
            sendObj.message.extra.caption = ctx.message.caption;
            sendObj.message.file_id = ctx.message.video.file_id;
        } else if (sendObj.message.type == 'video_note') {
            sendObj.message.file_id = ctx.message.video_note.file_id;
        }
        const usersCategor = await getCategory();
        const category = [[{ text: `Всем`, callback_data: `goSendall` }], [{ text: `В меню`, callback_data: `menu` }]];
        usersCategor.forEach(el => {
            category.unshift([{ text: `${el}`, callback_data: `goSend${el}` }]);
        });
        return ctx.reply(`Выберите категорию для рассылки:`, {
            reply_markup: {
                inline_keyboard: category
            }
        });
    } catch{
        await ctx.reply("Вы отправили сообщение неверного типа");
        await ctx.scene.reenter();
    }

});

senderScene.action(/^goSend/, async (ctx) => {
    const users = await getUser();
    if (ctx.callbackQuery.data.replace(/^goSend/, '') === 'all') {
        users.forEach(user => {
            sendObj.users.push(user.login)
        })
    } else {
        users.forEach(user => {
            if (user.category === ctx.callbackQuery.data.replace(/^goSend/, '')) {
                sendObj.users.push(user.login)
            }
        })

    }

    await ctx.reply(`Рассылаем сообщение?`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Да', callback_data: 'go' }],
                [{ text: 'Нет', callback_data: 'no' }]
            ]
        }
    })
});

senderScene.use(sender);
senderScene.action('go', async (ctx) => {
    if (sendObj.message.type == 'video_note'){
        await sendObj.users.forEach( function (user, index) {
            setTimeout( function () {
                try{
                    ctx.telegram.sendVideoNote(user, sendObj.message.file_id);
                } catch {
                    ctx.reply(`Пользователю ${user} сообщение не доставлено!`);
                }
            }, index * 100);
        })        
    } else {
        await ctx.msg.broadcast(sendObj);
    }
    await ctx.scene.leave();
    await ctx.scene.enter('menuScene');
})

senderScene.action('no', async (ctx) => {
    await ctx.scene.reenter();
});
senderScene.action('menu', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter('menuScene')
});

module.exports = senderScene