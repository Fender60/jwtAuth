const TelegramApi = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const UserModel = require('../models/user-model');

const token = '5027906155:AAHlRO-PAFLi_7c1gFlPQzCBrP4mtDw0Hpg';

const bot = new TelegramApi(token, {polling: true});

const startBd = async () => {
	try {
		await mongoose.connect('mongodb+srv://root:root@cluster0.hisaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}
	catch(e) {
		console.log(e);
	}
};
startBd();

const keyboard = {
	"parse_mode": "Markdown",
		"reply_markup": {
			"one_time_keyboard": true,
				"keyboard": [[{
					text: "Поделиться номером телефона",
						request_contact: true
				}], ["Отмена"]]
		}
}

const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Приветствие'},
	]);

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
		if(text === '/start'){
			const candidate = await UserModel.findOne({telegramId: chatId});
			if(candidate){
				return bot.sendMessage(chatId, `Вы уже зарегистрированы`)
			}else{
				return bot.sendMessage(chatId, `Для подтверждения регистрации поделитесь свои номером телефона`, keyboard);
			}
		}
	});

	bot.on('contact', async msg => {
		const chatId = msg.chat.id;
		const phone = msg.contact.phone_number;
		const candidate = await UserModel.findOne({phone});
		
		if(!candidate){
			await bot.sendMessage(chatId, `Такого пользователя не существует. Пройдите, пожалуйста, регистрацию на сайте`);
		}
		else {
			candidate.telegramId = chatId;
			candidate.isActivated = true;
			await candidate.save();

			bot.sendMessage(chatId, `Спасибо за регистрацию`);
		}
	})

}


start();





