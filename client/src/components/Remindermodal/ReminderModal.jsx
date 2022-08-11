import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import store from '../../actions/store';
import { Context } from '../context/Context';
import InputDate from '../inputDate/InputDate';
import InputTime from '../inputTime/InputTime';
import MyButton from '../myButton/MyButton';
import MyInput from '../myInput/MyInput';
import classes from './Modal.module.css';

const ReminderModal = ({visible, setVisible}) => {

	const rootClass = [classes.modal];
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);
	const [text, setText] = useState('');

	const {reminders, setReminders} = useContext(Context);
	

	const newReminder = (e) => {
		e.preventDefault();
		store.addReminder(date, time, text)
		.then(() => store.fetchReminders()
		.then((value) => setReminders(value)));
		setDate(null);
		setTime(null);
		setText('');
		setVisible(false);
	}

useEffect(() => {

}, [reminders])

	if(visible){
		rootClass.push(classes.active);
	}

	return (
		<div className={rootClass.join(' ')}
			onClick = {() => setVisible(false)}>
			<div className={classes.content} onClick = {(e) => e.stopPropagation()}>
			<h2>Новое напоминание</h2>
			<form>
				<div className={classes.date_time}>
					<InputDate
						selected={date}
						onChange={(date) => setDate(date)} 
						dateFormat="dd.MM.yyyy"
						placeholderText="Выберите дату"
						locale="ru"
					/>
					<InputTime
						selected={time}
						onChange={(time) => setTime(time)}
						showTimeInput
						showTimeSelectOnly
						timeInputLabel="Время:"
						dateFormat="HH:mm"
						placeholderText="Введите время"
					/>
				</div>
				<input className='auth__form-input'
					value={text}
					onChange = {e => setText(e.target.value)}
					type= 'TextArea'
					placeholder= 'Текст напоминания'
				/>
				<MyButton onClick={newReminder}>Создать напоминание</MyButton>
			</form>
			</div>
		</div>
	);
};

export default ReminderModal;