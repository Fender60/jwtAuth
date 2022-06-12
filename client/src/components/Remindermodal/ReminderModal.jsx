import React, { useState } from 'react';
import store from '../../actions/store';
import MyButton from '../myButton/MyButton';
import MyInput from '../myInput/MyInput';
import classes from './Modal.module.css';

const ReminderModal = ({visible, setVisible}) => {

	const rootClass = [classes.modal];
	const [reminder, setReminder] = useState({data: '', text: ''});

	const newReminder = (e) => {
		e.preventDefault();
		store.addReminder(reminder.data, reminder.text)
		setReminder({data: '', text: ''});
		setVisible(false);
	}

	if(visible){
		rootClass.push(classes.active);
	}

	return (
		<div className={rootClass.join(' ')}
			onClick = {() => setVisible(false)}>
			<div className={classes.content} onClick = {(e) => e.stopPropagation()}>
			<h2>Новое напоминание</h2>
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
		</div>
	);
};

export default ReminderModal;