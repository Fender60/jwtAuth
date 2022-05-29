import React from 'react';
import './reminder/Reminder';
import Reminder from './reminder/Reminder';

const ReminderList = ({reminders}) => {
	return (
		<div>
			<h1 style={{textAlign: 'center'}}>Список напоминаний</h1>
			{reminders.map((reminder, index) => 
				<Reminder reminder = {reminder} key ={index}/>
			)}
		</div>
	);
};

export default ReminderList;