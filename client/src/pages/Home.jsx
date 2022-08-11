import React, {useEffect, useState} from 'react';
import MyButton from "../components/myButton/MyButton";
import store from "../actions/store";
import ReminderList from '../components/ReminderList';
import ReminderModal from '../components/Remindermodal/ReminderModal';
import {Context} from '../components/context/Context';
import { useAuth } from '../components/context/useAuth';


const Home = () => {

	const [reminders, setReminders] = useState([]);
	const [addModal, setAddModal] = useState(false);
	const [isLoadingReminder, setIsLoadingReminder] = useState(false);

	const {signout} = useAuth();

//Функция выхода из аккаунта
	const logout = (e) => {
		e.preventDefault();
		signout();
	}


	useEffect(() => {
	setIsLoadingReminder(true);
	let response = store.fetchReminders()
	response.then((value) => setReminders(value))
	.then(() => setIsLoadingReminder(false))
	}, []);


		return (
			<Context.Provider value = {{
				reminders,
				setReminders,
				setIsLoadingReminder
			}}>
			<div className="content">
				<div className="content__container">
					<MyButton onClick={logout}>Выйти</MyButton>
					{store.servError.fetch
					? <div>Аккаунт не активирован. Для активации перейдите по ссылке: <a href='http://t.me/MsgRemBot'>Ссылка для активации</a></div>
					: <div>
						<MyButton onClick={() => setAddModal(true)}>Добавить напоминание</MyButton>
						<ReminderModal visible={addModal} setVisible={setAddModal}/>
						{isLoadingReminder
						? <h1>Loading...</h1>
						: <ReminderList reminders={reminders}/>
						}
					</div>
					}
				</div>
			</div>

			</Context.Provider>
		);
};

export default Home;