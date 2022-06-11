import React, { useState } from 'react';
import MyButton from '../myButton/MyButton';
import MyInput from '../myInput/MyInput';
import store from '../../actions/store';
import {observer} from "mobx-react-lite";

const ReminderForm = ({setVisible}) => {

	const [reminder, setReminder] = useState({data: '', text: ''});

	const newReminder = (e) => {
		e.preventDefault();
		store.addReminder(reminder.data, reminder.text)
		setReminder({data: '', text: ''});
		setVisible(false);
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
				<MyButton onClick={newReminder}>Создать напоминание</MyButton>
			</form>
		</div>
	);
};

export default observer(ReminderForm);