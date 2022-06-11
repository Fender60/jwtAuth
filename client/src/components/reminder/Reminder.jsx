import React from 'react';
import store from '../../actions/store';
import ReminderForm from '../reminderForm/ReminderForm';
import './reminder.scss';


const Reminder = (props) => {


	return (
		<div className='reminder'>
			<div className='reminder__container'>
				<div className="reminder__body">
					<div className='reminder__data'>{props.reminder.data}</div>
					<div className='reminder__text'>{props.reminder.text}</div>
				</div>
				<div className="reminder__button">
					<button>Редактировать</button>
					<button onClick={() => store.removeReminder(props.reminder)}>Удалить</button>
				</div>
			</div>
			<hr style={{margin: '15px 0'}}/>
		</div>
	);
};

export default Reminder;