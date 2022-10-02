import { IconButton, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import store from '../../actions/store';
import { Context } from '../context/Context';
import EditModal from '../editModal/EditModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AlarmIcon from '@mui/icons-material/Alarm';
import './reminder.scss';


const Reminder = (props) => {

	const [editModal, setEditModal] = useState(false);

	const {reminders, setReminders} = useContext(Context);

	const date = new Date(props.reminder.date).toLocaleDateString();
	const time = new Date(props.reminder.date).toLocaleTimeString();

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
						<DateRangeIcon/>
						<div className='reminder__data'>{date}</div>
						<AlarmIcon/>
						<div className='reminder__data'>{time}</div>
					</div>
					<div className='reminder__text'>{props.reminder.text}</div>
				</div>
				<div className="reminder__button">
					<Tooltip title="Редактировать">
						<IconButton aria-label="edit" size="small" onClick={() => setEditModal(true)}>
							<EditIcon fontSize="small" />
						</IconButton>
					</Tooltip>

					<Tooltip title="Удалить">
						<IconButton aria-label="delete" size="small" onClick={remove}>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</div>
			</div>
			<hr style={{margin: '15px 0'}}/>
		</div>
	);
};

export default Reminder;