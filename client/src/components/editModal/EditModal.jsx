import { FormControl, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import store from '../../actions/store';
import { Context } from '../context/Context';
import MyButton from '../myButton/MyButton';
import classes from './Modal.module.css';

const EditModal = ({body, visible, setVisible}) => {

	const rootClass = [classes.modal];

	const [date, setDate] = useState('');
	const [text, setText] = useState(body.text);

	const {reminders, setReminders} = useContext(Context);


	const editSaveReminder = (e) => {
		e.preventDefault();
		store.editReminder(date, text, body._id)
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
			<div className={classes.title}>Редактирование</div>
			<form>
				<div className={classes.date}>
					<TextField
						id="datetime-local"
						label="Дата, время"
						type="datetime-local"
						className={classes.textField}
						onChange = {(e) => setDate(e.target.value)}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<FormControl fullWidth>
					<TextField
						id="outlined-textarea"
						label="Текст напоминания"
						placeholder="Текст напоминания"
						multiline
						rows={4}
						value={text}
						onChange = {e => setText(e.target.value)}
					/>
				</FormControl>
				
				<MyButton onClick={editSaveReminder}>Сохранить</MyButton>
			</form>
			</div>
		</div>
	);
};

export default EditModal;