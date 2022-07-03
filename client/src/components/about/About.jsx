import React, {useEffect, useState} from 'react';
import MyButton from "../myButton/MyButton";
import store from "../../actions/store";
import ReminderList from '../ReminderList';
import ReminderModal from '../Remindermodal/ReminderModal';
import {Context} from '../context/Context';


const About = () => {

	const [reminders, setReminders] = useState([]);
	const [addModal, setAddModal] = useState(false);


	useEffect(() => {
	let response = store.fetchReminders()
	response.then((value) => setReminders(value))
	}, []);


		return (
			<Context.Provider value = {{
				reminders,
				setReminders
			}}>
			<div className="content">
				<div className="content__container">
					<MyButton onClick={() => store.logout()}>Выйти</MyButton>
					<MyButton onClick={() => setAddModal(true)}>Добавить напоминание</MyButton>
					<ReminderModal visible={addModal} setVisible={setAddModal}/>
					<ReminderList reminders={reminders}/>
				</div>
			</div>

			</Context.Provider>
		);
};

export default About;