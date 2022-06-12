import React, { useState } from 'react';
import store from '../../actions/store';
import MyButton from '../myButton/MyButton';
import MyInput from '../myInput/MyInput';
import classes from './Modal.module.css';

const EditModal = ({body, visible, setVisible}) => {

	const rootClass = [classes.modal];
	const [reminder, setReminder] = useState({data: body.data, text: body.text});

	const editReminder = (e) => {
		e.preventDefault();
		store.editReminder(reminder.data, reminder.text, body._id);
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
			<h2>Редактирование</h2>
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
				<MyButton onClick={editReminder}>Сохранить</MyButton>
			</form>
			</div>
		</div>
	);
};

export default EditModal;