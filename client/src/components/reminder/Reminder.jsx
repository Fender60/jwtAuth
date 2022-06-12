import { useState } from 'react';
import store from '../../actions/store';
import EditModal from '../editModal/EditModal';
import './reminder.scss';


const Reminder = (props) => {

	const [editModal, setEditModal] = useState(false);

	return (
		<div className='reminder'>
			<EditModal 
			visible={editModal} 
			setVisible={setEditModal}
			body={props.reminder}
			/>
			<div className='reminder__container'>
				<div className="reminder__body">
					<div className='reminder__data'>{props.reminder.data}</div>
					<div className='reminder__text'>{props.reminder.text}</div>
				</div>
				<div className="reminder__button">
					<button onClick={() => setEditModal(true)}>Редактировать</button>
					<button onClick={() => store.removeReminder(props.reminder)}>Удалить</button>
				</div>
			</div>
			<hr style={{margin: '15px 0'}}/>
		</div>
	);
};

export default Reminder;