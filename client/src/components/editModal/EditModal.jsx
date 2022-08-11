import React, { useContext, useState } from 'react';
import store from '../../actions/store';
import { Context } from '../context/Context';
import InputDate from '../inputDate/InputDate';
import InputTime from '../inputTime/InputTime';
import MyButton from '../myButton/MyButton';
import classes from './Modal.module.css';

const EditModal = ({body, visible, setVisible}) => {

	const rootClass = [classes.modal];
	const [date, setDate] = useState(new Date(body.date));
	const [time, setTime] = useState(new Date(body.time));
	const [text, setText] = useState(body.text);

	const {reminders, setReminders} = useContext(Context);


	const editReminder = (e) => {
		e.preventDefault();
		store.editReminder(date, time, text, body._id)
		.then(() => store.fetchReminders()
		.then((value) => setReminders(value)));
		setVisible(false);
	}


	if(visible){
		rootClass.push(classes.active);
	}

	return (
		<div className={rootClass.join(' ')}
			onClick = {() => setVisible(false)}>
			<div className={classes.content} onClick = {(e) => e.stopPropagation()}>
			<h2>Редактирование</h2>
			<form>
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
				<input className='auth__form-input'
					value={text}
					onChange = {e => setText(e.target.value)}
					type= 'text'
					placeholder= 'Текст напоминания'
				/>
				<MyButton onClick={editReminder} >Сохранить</MyButton>
			</form>
			</div>
		</div>
	);
};

export default EditModal;