import { useContext, useState } from 'react';
import store from '../../actions/store';
import { Context } from '../context/Context';
import EditModal from '../editModal/EditModal';
import './reminder.scss';


const Reminder = (props) => {

	const [editModal, setEditModal] = useState(false);

	const {reminders, setReminders} = useContext(Context);

	const date = new Date(props.reminder.date).toLocaleDateString();
	const time = new Date(props.reminder.time).toLocaleTimeString();

	const remove = () => {
		store.removeReminder(props.reminder)
		.then(() => store.fetchReminders()
		.then((value) => setReminders(value)));
	}

	return (
		<div className='reminder'>
			<EditModal 
			visible={editModal} 
			setVisible={setEditModal}
			body={props.reminder}
			/>
			<div className='reminder__container'>
				<div className="reminder__body">
					<div className="reminder__date-time">
						<div className='reminder__data'>{date}</div>
						<div className='reminder__data'>{time}</div>
					</div>
					<div className='reminder__text'>{props.reminder.text}</div>
				</div>
				<div className="reminder__button">
					<button onClick={() => setEditModal(true)}>Редактировать</button>
					<button onClick={remove}>Удалить</button>
				</div>
			</div>
			<hr style={{margin: '15px 0'}}/>
		</div>
	);
};

export default Reminder;