const {Schema, model} = require('mongoose');

const ReminderSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	data: {type: String, required: true},
	text: {type: String, required: true}
});

module.exports = model('Reminder', ReminderSchema);