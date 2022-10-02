import React, { useEffect, useState } from 'react';
import './clock.scss';

const Clock = () => {

	const [date, setDate] = useState(new Date());

	useEffect(() =>{
	const interval = setInterval(() => {setDate(new Date())}, 1000);
	return () => clearInterval(interval);
	}, []);



	return (
		<div className='time'>
			<span>{date.getHours()>9?date.getHours():`0${date.getHours()}`}:</span>
			<span>{date.getMinutes()>9?date.getMinutes():`0${date.getMinutes()}`}:</span>
			<span>{date.getSeconds()>9?date.getSeconds():`0${date.getSeconds()}`}</span>
		</div>
	);
};

export default Clock;