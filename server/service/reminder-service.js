const UserModel = require("../models/user-model");


class ReminderService {

	async addReminder(data, text, userId) {

		await UserModel.updateOne({_id: userId},  {$push: {'reminders': {data: data, text: text}}});
		return;
	}

	async getReminder(userId) {
		const user = await UserModel.findOne({_id: userId});
		return user.reminders;
	}
}

module.exports = new ReminderService();