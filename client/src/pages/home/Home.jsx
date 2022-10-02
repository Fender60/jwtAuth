import React, {useEffect, useState} from 'react';
import store from "../../actions/store";
import ReminderList from '../../components/reminderList/ReminderList';
import './home.scss'
import {Context} from '../../components/context/Context';
import HomeHeader from '../../components/HomeHeader';
import { Box, CircularProgress } from '@mui/material';



const Home = () => {

	const [reminders, setReminders] = useState([]);
	const [isLoadingReminder, setIsLoadingReminder] = useState(false);


	useEffect(() => {
	setIsLoadingReminder(true);
	let response = store.fetchReminders()
	response.then((value) => setReminders(value))
	.then(() => setIsLoadingReminder(false))
	}, []);

	//=======================================================
	 
		return (
			<Context.Provider value = {{
				reminders,
				setReminders,
				setIsLoadingReminder
			}}>
			<div className="content">
				<HomeHeader/>
				<div className="content__container">
					{store.servError.fetch
					? <div className='home__subtitle'>Аккаунт не активирован. Для активации перейдите по ссылке: <a href='http://t.me/MsgRemBot'>Ссылка для активации</a></div>
					: <div>
						{isLoadingReminder
						? <Box sx={{ 
								position: 'fixed',
								width: '100%',
								height: '100%',
								display: 'flex', 
								alignItems: 'center', 
								justifyContent: 'center' }}>
								<CircularProgress />
					 		</Box>
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