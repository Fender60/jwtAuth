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

	const {setReminders, setPage} = useContext(Context);

	const editSaveReminder = (e) => {
		e.preventDefault();
		store.editReminder(date, text, body._id)
		.then(() => store.fetchReminders(1, 5))
		.then((value) => setReminders(value));
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
			<div className={classes.title}>Editing</div>
			<form>
				<div className={classes.date}>
					<TextField
						id="datetime-local"
						label="Date, time"
						type="datetime-local"
						className={classes.textField}
						onChange = {(e) => setDate(e.target.value)}
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
						label="Your reminder"
						multiline
						rows={4}
						value={text}
						onChange = {e => setText(e.target.value)}
					/>
				</FormControl>
				
				<MyButton onClick={editSaveReminder}>Save</MyButton>
			</form>
			</div>
		</div>
	);
};

export default EditModal;