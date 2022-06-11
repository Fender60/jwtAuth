import React, {useEffect, useState} from 'react';
import MyButton from "../myButton/MyButton";
import store from "../../actions/store";
import ReminderList from '../ReminderList';
import axios from 'axios';
import Modal from '../modal/Modal';
import ReminderForm from '../reminderForm/ReminderForm';

const About = () => {

	const [reminders, setReminders] = useState([]);
	const [modal, setModal] = useState(false);

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
					<MyButton onClick={() => setModal(true)}>Добавить напоминание</MyButton>
					<Modal visible={modal} setVisible={setModal}>
					<ReminderForm setVisible={setModal}/>
					</Modal>
					<ReminderList reminders={reminders}/>
				</div>
			</div>
		);
};

export default About;