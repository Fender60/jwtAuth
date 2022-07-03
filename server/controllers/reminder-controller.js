const reminderService = require('../service/reminder-service');
const ApiError = require('../exceptions/api-error');

class ReminderController {


	async addReminder(req, res, next) {
		try {
				const {userId} = req.cookies;
				const {date, time, text} = req.body;
				const userBody = await reminderService.addReminder(date, time, text, userId);
				return res.json(userBody);
		}
		catch (e) {
				next(e);
		}
	}

	async editReminder(req, res, next) {
		try {
				const {id, date, time, text} = req.body;
				const reminderBody = await reminderService.editReminder(id, date, time, text);
				return res.json(reminderBody);
		}
		catch (e) {
				next(e);
		}
	}

	async deleteReminder(req, res, next) {
		try {
				const {reminderId} = req.body;
				const reminderBody = await reminderService.deleteReminder(reminderId);
				return res.json(reminderBody);
		}
		catch (e) {
				next(e);
		}
	}


	async allReminders(req, res, next) {
		try {
				const {userId} = req.cookies;
				const reminders = await reminderService.getReminder(userId);
				return res.json(reminders);
		}
		catch (e) {
				next(e);
		}
	}

}

module.exports = new ReminderController();
