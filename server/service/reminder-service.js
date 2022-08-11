const ReminderModel = require('../models/reminder-model');
const UserModel = require('../models/user-model');
const ApiError = require('../exceptions/api-error');

class ReminderService {

	async addReminder(date, time, text, userId) {
		const reminder = await ReminderModel.create({user: userId, date: date, time: time, text: text});
		return reminder;
	}

	async editReminder(reminderId, date, time, text) {
		const reminder = await ReminderModel.findOne({_id: reminderId});
		if(reminder) {
			reminder.date = date;
			reminder.time = time;
			reminder.text = text;
			return reminder.save();
		}
		return;
	}

	async deleteReminder(reminderId) {
		await ReminderModel.deleteOne({_id: reminderId});
		return;
	}

	async getReminder(userId) {
		const user = await UserModel.findOne({_id: userId}); 
		
		if(user.isActivated === false){
			throw ApiError.ForbiddenError();
		}

		const reminders = await ReminderModel.find({user: userId});
		return reminders;
	}
}

module.exports = new ReminderService();