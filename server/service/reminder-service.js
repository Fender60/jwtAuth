const ReminderModel = require('../models/reminder-model');

class ReminderService {

	async addReminder(data, text, userId) {

		const reminder = await ReminderModel.create({user: userId, data: data, text: text});
		return reminder;
	}

	async editReminder(reminderId, data, text) {
		const reminder = await ReminderModel.findOne({_id: reminderId});
		if(reminder) {
			reminder.data = data;
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
		const reminders = await ReminderModel.find({user: userId});
		return reminders;
	}
}

module.exports = new ReminderService();