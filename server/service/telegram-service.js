const TelegramApi = require('node-telegram-bot-api');
const UserModel = require('../models/user-model');
const ReminderModel = require('../models/reminder-model');
const mongoose = require('mongoose');

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


async function searchAndSendMessage(id, text) {
	const user = await UserModel.findOne({_id: id});
	return bot.sendMessage(user.telegramId, text);
}

async function editStatus(id, status) {
	const reminder = await ReminderModel.findOne({_id: id});
	if(reminder.status !== 'done') {
		reminder.status = status;
	}
	await reminder.save();
}


async function searchReminders() {
	const dateNow = new Date();
	const reminders = await ReminderModel.find();
	reminders.forEach(element => {
		const dateDb = new Date(element.date).getTime();
		const rezult = dateNow.getTime()-dateDb; 
		if(rezult > 86400000){
			editStatus(element._id, 'no done');
		} else if(rezult < 86400000 && rezult > 0) {
			const timeDb = new Date(element.time);

			if(timeDb.getHours() == dateNow.getHours() && timeDb.getMinutes() == dateNow.getMinutes()) {
					searchAndSendMessage(element.user, element.text);
					editStatus(element._id, 'done');
			} else if(timeDb.getHours() < dateNow.getHours() || timeDb.getMinutes() < dateNow.getMinutes()) {
				editStatus(element._id, 'no done');
			}
		}
	});
}

let CronJob = require('cron').CronJob;
new CronJob('00 * * * * *', () => {searchReminders()}, null, true);

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





