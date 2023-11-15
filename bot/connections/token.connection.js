require("dotenv").config();
const { Telegraf } = require("telegraf");

exports.bot = new Telegraf(process.env.BOT_TOKEN, {handlerTimeout: 9_000_000});