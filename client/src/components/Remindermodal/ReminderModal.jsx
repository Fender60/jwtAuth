import { FormControl, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import store from '../../actions/store';
import { Context } from '../context/Context';
import MyButton from '../myButton/MyButton';
import classes from './Modal.module.css';

const ReminderModal = ({visible, setVisible}) => {

	const rootClass = [classes.modal];
	const [date, setDate] = useState('');
	const [text, setText] = useState('');

	const {setReminders, limit, setPage} = useContext(Context);

	const newReminder = (e) => {
		e.preventDefault();
		store.addReminder(date, text)
		.then(() => store.fetchReminders(1, limit)
		.then((value) => setReminders(value)));
		setDate('');
		setText('');
		setPage(1);
		setVisible(false);
	}


	if(visible){
		rootClass.push(classes.active);
	}

	return (
		<div className={rootClass.join(' ')}
			onClick = {() => setVisible(false)}>
			<div className={classes.content} onClick = {(e) => e.stopPropagation()}>
			<div className={classes.title}>New reminder</div>
			<form>
				<div className={classes.date}>
					<TextField 
						id="datetime-local"
						label="Date, time"
						type="datetime-local"
						className={classes.textField}
						value={date}
						onChange = {e => setDate(e.target.value)}
						slotProps = {{
							inputLabel: {
								shrink: true,
							}
						}}
					/>
				</div>
				<FormControl fullWidth>
				<TextField
					id="outlined-textarea"
					label="Your text"
					multiline
					rows={4}
					value={text}
					onChange = {e => setText(e.target.value)}
				/>
				</FormControl>

				<MyButton onClick={newReminder}>Create reminder</MyButton>
			</form>
			</div>
		</div>
	);
};

export default ReminderModal;