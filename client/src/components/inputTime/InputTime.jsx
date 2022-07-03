import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const InputTime = (props) => {

	return (
		<div>
			<DatePicker {...props}/>
		</div>
	);
};

export default InputTime;