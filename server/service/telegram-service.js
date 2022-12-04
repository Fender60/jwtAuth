const TelegramApi = require('node-telegram-bot-api');
const UserModel = require('../models/user-model');
const ReminderModel = require('../models/reminder-model');
const mongoose = require('mongoose');
const { query } = require('express');

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

//Отправка сообщения в телеграм
async function searchAndSendMessage(id, text) {
	const user = await UserModel.findOne({_id: id});
	return bot.sendMessage(user.telegramId, text, {
		reply_markup: {
				inline_keyboard: [
					[
					{
						text: '',
						callback_data: ''
					}
				],
				[
					{
						text: '',
						callback_data: ''
					}
				]
			]
		}
	});
}

async function editStatus(id, status) {
	const reminder = await ReminderModel.findOne({_id: id});
	if(reminder.status !== 'done') {
		reminder.status = status;
	}
	await reminder.save();
}

//Поиск напоминаний для выполнения
async function searchReminders() {
	const dateNow = new Date();
	const reminders = await ReminderModel.find();
	reminders.forEach(element => {
		const dateDb = new Date(element.date).getTime();
		const rezult = dateNow.getTime()-dateDb; 
		if(rezult > 86400000){
			editStatus(element._id, 'no done');
		} else if(rezult < 86400000 && rezult > 0) {
			const timeDb = new Date(element.date);

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


const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Старт'},
		{command: '/reset', description: 'Сброс пароля для входа в личный кабинет'},
	]);

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
		if(text === '/start'){
			const candidate = await UserModel.findOne({telegramId: chatId});
			if(candidate){
				return bot.sendMessage(chatId, `Вы уже зарегистрированы`)
			}else{
				return bot.sendMessage(chatId, `Для подтверждения регистрации поделитесь свои номером телефона`, {
					"reply_markup": {
						"one_time_keyboard": true,
							"keyboard": [[{
								text: "Поделиться номером телефона",
									request_contact: true
							}], ["Отмена"]]
					}
				});
			}
		}

		if(text === '/reset'){ 
			bot.sendMessage(chatId, 'Вы уверены, что хотите выполнить сброс пароля?', {
				reply_markup: {
					inline_keyboard: [
						[
						{
							text: 'Да',
							callback_data: 'resetPassword'
						}
					],
					[
						{
							text: 'Нет',
							callback_data: 'noReset'
						}
					]
				]
				}
			});
		}
	});

	//Сброс пароля
	bot.on('callback_query', async query => {
		if(query.data==='resetPassword') {
			const user = await UserModel.findOne({telegramId: query.message.chat.id});
			if(!user) {
				bot.sendMessage(query.message.chat.id, 'Вы не зарегестрированы, пройдите регистрацию на сайте для продолжения');
			} else {
				const url = `http://localhost:3000/resetpassword/${user.phone}`;
				bot.sendMessage(query.message.chat.id, 'Для сброса пароля перейдите по ссылке ниже',{
					reply_markup: {
						inline_keyboard: [
							[
							{
								text: 'Ссылка',
								url: url
							}
						],
					]
					}
				})
			}
		}
		if(query.data==='noReset') {
			bot.sendMessage(query.message.chat.id, 'Сброс пароля не выполнен')
		}
	});

	//Подтверждение регистрации
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





