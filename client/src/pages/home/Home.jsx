import React, {useEffect, useRef, useState} from 'react';
import store from "../../actions/store";
import ReminderList from '../../components/reminderList/ReminderList';
import './home.scss'
import {Context} from '../../components/context/Context';
import HomeHeader from '../../components/HomeHeader';



const Home = () => {

	const [reminders, setReminders] = useState([]);
	const [isLoadingReminder, setIsLoadingReminder] = useState(false);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [totalCount, setTotalCount] = useState();
	const [totalPages, setTotalPages] = useState();
	const lastElement = useRef();
	const observer = useRef();

	useEffect(() => {
		if(isLoadingReminder) return;
		if(observer.current) observer.current.disconnect();

		var callback = function(entries, observer) {
			if(entries[0].isIntersecting && page < totalPages) {
				setPage(page + 1);
			}
		};
		observer.current = new IntersectionObserver(callback);
		observer.current.observe(lastElement.current)
	}, [isLoadingReminder])

	useEffect(() => {
	setIsLoadingReminder(true);
	let response = store.fetchReminders(page, limit);
	response.then((value) =>{ 
		setReminders([...reminders, ...value]);
		setTotalCount(store.totalCount);
	})
	.then(() =>setIsLoadingReminder(false))
	}, [page]);

	useEffect(() => {
		pageCount();
	}, [totalCount])

	//Подсчёт общего кол-ва страниц
	const pageCount = () => {
		setTotalPages(Math.ceil(totalCount / limit));
	}
	

	//=======================================================
	 
		return (
			<Context.Provider value = {{
				reminders,
				setReminders,
				isLoadingReminder,
				setIsLoadingReminder,
				page,
				setPage,
				limit
			}}>
			<div className="content">
				<HomeHeader/>
				<div className="content__container">
					{store.servError.fetch
					? <div className='home__subtitle'>Аккаунт не активирован. Для активации перейдите по ссылке: <a href='http://t.me/MsgRemBot'>Ссылка для активации</a></div>
					: <ReminderList reminders={reminders}/>
					}
					<div ref = {lastElement} style={{height: 20}}></div>
				</div>
			</div>

			</Context.Provider>
		);
};

export default Home;