import React, { useState } from 'react';
import MyButton from '../myButton/MyButton';
import MyInput from '../myInput/MyInput';

const ReminderForm = ({create}) => {

	const [reminder, setReminder] = useState({data: '', text: ''});

	const addNewReminder = (e) => {
		e.preventDefault();
		const newReminder = {
			...reminder
	  }
	  create(newReminder);
	  setReminder({data: '', text: ''});
  }

	return (
		<div>
			<form>
				<MyInput
					value={reminder.data}
					onChange = {e => setReminder({...reminder, data: e.target.value})}
					type= 'text'
					placeholder= 'Дата'
				/>
				<MyInput
					value={reminder.text}
					onChange = {e => setReminder({...reminder, text: e.target.value})}
					type= 'text'
					placeholder= 'Текст напоминания'
				/>
				<MyButton onClick={addNewReminder}>Создать напоминание</MyButton>
			</form>
		</div>
	);
};

export default ReminderForm;