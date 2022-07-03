import React from 'react';
import store from '../actions/store';
import './reminder/Reminder';
import Reminder from './reminder/Reminder';




const ReminderList = ({reminders}) => {
	if(store.isLoadingReminder) {
		return <div>Hello</div>
	}
	return (
		<div>
			<h1 style={{textAlign: 'center'}}>
				{reminders.length === 0 ? `Напоминания отсутствуют` : `Список напоминаний`}
			</h1>
			{reminders.map((reminder) => 
				<Reminder reminder = {reminder} key ={reminder._id}/>
			)}

		</div>
	);
};

export default ReminderList;