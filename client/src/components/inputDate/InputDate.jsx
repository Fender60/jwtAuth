import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './InputDate.scss';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

const InputDate = (props) => {

	return (
		<div>
			<DatePicker {...props}/>
		</div>
	);
};

export default InputDate;