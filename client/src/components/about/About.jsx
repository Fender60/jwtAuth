import React, {useEffect, useState} from 'react';
import MyButton from "../myButton/MyButton";
import store from "../../actions/store";
import ReminderList from '../ReminderList';
import axios from 'axios';
import ReminderForm from '../reminderForm/ReminderForm';

const About = () => {

	const [reminders, setReminders] = useState([]);

	async function fetchReminders() {
		try {
		  const response = await axios.get('http://localhost:5000/api/reminders', {withCredentials: true});
		  setReminders(response.data);
		} catch (e) {
		  console.log(e.response?.data?.message);
		}
	  
  }

	useEffect(() => {
		fetchReminders();
	}, []);

	const createReminder = (newReminder) => {
		setReminders([...reminders, newReminder]);
	}


		return (
			<div className="content">
				<div className="content__container">
					<MyButton onClick={() => store.logout()}>Выйти</MyButton>
					<ReminderForm create={createReminder}/>
					<ReminderList reminders={reminders}/>
				</div>
			</div>
		);
};

export default About;