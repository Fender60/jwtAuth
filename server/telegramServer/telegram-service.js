const TelegramApi = require('node-telegram-bot-api');
const UserModel = require('../models/user-model');
const ReminderModel = require('../models/reminder-model');
const mongoose = require('mongoose');

const token = '5027906155:AAHlRO-PAFLi_7c1gFlPQzCBrP4mtDw0Hpg';

const bot = new TelegramApi(token, {polling: true});

mongoose.set('strictQuery', true);

const startBd = async () => {
	try {
		await mongoose.connect('mongodb+srv://root:root@cluster0.hisaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&appName=Cluster0', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}
	catch(e) {
		console.log(e);
	}
};
startBd();


//Sending messages to telegrams
async function searchAndSendMessage(userId, text) {
	const user = await UserModel.findOne({_id: userId});
	return bot.sendMessage(user.telegramId, `✔${text}`);
}

async function editStatus(id, status) {
	const reminder = await ReminderModel.findOne({_id: id});
	if(reminder.status !== 'done') {
		reminder.status = status;
	}
	await reminder.save();
}

//Search for reminders for execution
async function searchReminders() {
	const dateNow = new Date();
	const reminders = await ReminderModel.find();
	reminders.forEach(element => {
		const dateDb = new Date(element.date).getTime();
		const rezult = dateNow.getTime()-dateDb; 
		if(rezult > 86400000){
			editStatus(element._id, 'noDone');
		} else if(rezult < 86400000 && rezult > 0) {
			const timeDb = new Date(element.date);

			if(timeDb.getHours() == dateNow.getHours() && timeDb.getMinutes() == dateNow.getMinutes()) {
					searchAndSendMessage(element.user, element.text);
					editStatus(element._id, 'done');
			} else if(timeDb.getHours() < dateNow.getHours() || timeDb.getMinutes() < dateNow.getMinutes()) {
				editStatus(element._id, 'noDone');
			}
		}
	});
}

let CronJob = require('cron').CronJob;
new CronJob('00 * * * * *', () => {searchReminders()}, null, true);


const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Start'},
		{command: '/reset', description: 'Password reset'},
	]);

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
		if(text === '/start'){
			const candidate = await UserModel.findOne({telegramId: chatId});
			if(candidate){
				return bot.sendMessage(chatId, `You are already registered`)
			}else{
				return bot.sendMessage(chatId, `To confirm registration, share your phone number`, {
					"reply_markup": {
						"one_time_keyboard": true,
							"keyboard": [[{
								text: "Share the phone number",
									request_contact: true
							}], ["Cancel"]]
					}
				});
			}
		}

		if(text === '/reset'){ 
			bot.sendMessage(chatId, 'Are you sure you want to dump your password?', {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: 'Yes',
								callback_data: 'resetPassword'
							},
							{
								text: 'No',
								callback_data: 'noReset'
							}
						]
					],
				}
			});
		}
	});

	//Password reset
	bot.on('callback_query', async query => {
		if(query.data==='resetPassword') {
			const user = await UserModel.findOne({telegramId: query.message.chat.id});
			if(!user) {
				bot.sendMessage(query.message.chat.id, 'You are not registered, pass the registration on the site to continue');
			} else {
				const url = `http://localhost:3000/resetpassword/${user.phone}`;
				bot.sendMessage(query.message.chat.id, 'To reset the password, follow the link below',{
					reply_markup: {
						inline_keyboard: [
							[
							{
								text: 'Link',
								url: url
							}
						],
					]
					}
				})
			}
		}
		if(query.data==='noReset') {
			bot.sendMessage(query.message.chat.id, 'Password reset is not completed')
		}
	});

	//Confirmation of registration
	bot.on('contact', async msg => {
		const chatId = msg.chat.id;
		const phone = msg.contact.phone_number;
		const candidate = await UserModel.findOne({phone});
		
		if(!candidate){
			await bot.sendMessage(chatId, `Such a user does not exist. Please take registration on the site`);
		}
		else {
			candidate.telegramId = chatId;
			candidate.isActivated = true;
			await candidate.save();

			bot.sendMessage(chatId, `Thanks for the registration`);
		}
	})

}


start();





