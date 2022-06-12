import React, {useEffect, useState} from 'react';
import MyButton from "../myButton/MyButton";
import store from "../../actions/store";
import ReminderList from '../ReminderList';
import axios from 'axios';
import ReminderModal from '../Remindermodal/ReminderModal';

const About = () => {

	const [reminders, setReminders] = useState([]);
	const [addModal, setAddModal] = useState(false);

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
	});


		return (
			<div className="content">
				<div className="content__container">
					<MyButton onClick={() => store.logout()}>Выйти</MyButton>
					<MyButton onClick={() => setAddModal(true)}>Добавить напоминание</MyButton>
					<ReminderModal visible={addModal} setVisible={setAddModal}/>
					<ReminderList reminders={reminders}/>
				</div>
			</div>
		);
};

export default About;