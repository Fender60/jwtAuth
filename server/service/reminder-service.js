const UserModel = require("../models/user-model");


class ReminderService {

    async addReminder(data, text, userId) {

        await UserModel.updateOne({_id: userId},  {$push: {'reminders': {data: data, text: text}}});

        return

    }
}

module.exports = new ReminderService();