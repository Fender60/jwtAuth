import React from 'react';
import './reminder/Reminder';
import Reminder from './reminder/Reminder';
import {CSSTransition, TransitionGroup} from 'react-transition-group';




const ReminderList = ({reminders}) => {
	return (
		<div>
			<h1 style={{textAlign: 'center'}}>
				{reminders.length === 0 ? `Напоминания отсутствуют` : `Список напоминаний`}
			</h1>
			<TransitionGroup>
			{reminders.map((reminder) => 
			<CSSTransition
				key ={reminder._id}
				timeout={500}
				classNames="reminder"
			>
			<Reminder reminder = {reminder}/>
			</CSSTransition>
			)}
			</TransitionGroup>

		</div>
	);
};

export default ReminderList;