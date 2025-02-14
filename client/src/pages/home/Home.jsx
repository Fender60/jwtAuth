import React, { useEffect, useRef, useState } from 'react';
import store from "../../actions/store";
import ReminderList from '../../components/reminderList/ReminderList';
import './home.scss'
import { Context } from '../../components/context/Context';
import HomeHeader from '../../components/HomeHeader';



const Home = () => {

	const [reminders, setReminders] = useState([]);
	const [isLoadingReminder, setIsLoadingReminder] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const lastElement = useRef(null);
	const observer = useRef(null);

	let limit = 5;

	// IntersectionObserver for loading more reminders
	useEffect(() => {
		if (isLoadingReminder) return; 

		if (observer.current) observer.current.disconnect(); // delite previous observer

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && page < totalPages) {
				setPage((prev) => prev + 1);
			}
		});

		if (lastElement.current) observer.current.observe(lastElement.current);

		return () => {
			if (observer.current) observer.current.disconnect();
		};
	}, [isLoadingReminder, page, totalPages]);

	// Get data from server
	useEffect(() => {
		setIsLoadingReminder(true);

		store.fetchReminders(page, limit).then((value) => {
			if (value) {
				setReminders((prev) => [...prev, ...value]);
			}
			setTotalPages(Math.ceil(store.totalCount / limit)); // Calculate total pages
		}).finally(() => setIsLoadingReminder(false));
	}, [page, limit]);


	return (
		<Context.Provider value={{
			reminders,
			setReminders,
			isLoadingReminder,
			setIsLoadingReminder,
			page,
			setPage,
			limit
		}}>
			<div className="content">
				<HomeHeader />
				<div className="content__container">
					{store.servError.fetch
						? <div className='home__subtitle'>The account is not activated. To activate it, please follow the link: <a href='http://t.me/MsgRemBot'>Link</a></div>
						: <ReminderList reminders={reminders} />
					}
					<div ref={lastElement} style={{ height: 20 }}></div>
				</div>
			</div>

		</Context.Provider>
	);
};

export default Home;