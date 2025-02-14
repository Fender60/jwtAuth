import { IconButton, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import store from '../../actions/store';
import { Context } from '../context/Context';
import EditModal from '../editModal/EditModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AlarmIcon from '@mui/icons-material/Alarm';
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import './reminder.scss';


const Reminder = (props) => {

	const [editModal, setEditModal] = useState(false);

	const {reminders ,setReminders} = useContext(Context);

	const date = new Date(props.reminder.date).toLocaleDateString();
	const time = new Date(props.reminder.date).toLocaleTimeString();

	//Application of styles depending on the status of a reminder
	const reminderText = (status) => {
		if(status === 'done'){
			return <div className='reminder__text'>
					<DoneOutlineTwoToneIcon
						sx = {{color: 'green'}}
					/> {props.reminder.text}
				</div>
		}else if(status === 'noDone') {
			return <div className='reminder__text'>
						<CancelOutlinedIcon
							sx = {{color: 'red'}}
						/> {props.reminder.text}
					</div>
		}else {
			return <div className='reminder__text'>{props.reminder.text}</div>
		}
	}

	const remove = (reminder) => {
		store.removeReminder(reminder)
		setReminders(reminders.filter(r => r._id !== reminder._id))
	}

	return (
		<div className={`reminder reminder__${props.reminder.status}`}>
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
					{reminderText(props.reminder.status)}
				</div>
				<div className="reminder__button">
					<Tooltip title="Edit">
						<IconButton aria-label="edit" size="small" onClick={() => setEditModal(true)}>
							<EditIcon fontSize="small" />
						</IconButton>
					</Tooltip>

					<Tooltip title="Delete">
						<IconButton aria-label="delete" size="small" onClick={() => remove(props.reminder)}>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default Reminder;