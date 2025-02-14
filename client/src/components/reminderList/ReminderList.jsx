import React, { useState, useContext, useRef } from 'react';
import '../reminder/Reminder';
import { Context } from '../context/Context';
import Reminder from '../reminder/Reminder';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './reminderList.scss'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { makeStyles } from '@mui/styles';
import Clock from '../clock/Clock';
import ReminderModal from '../Remindermodal/ReminderModal';
import StraightIcon from '@mui/icons-material/Straight';
import { DotPulse } from '@uiball/loaders'



//Styles for calendar
const useStyles = makeStyles({
	root: {
		'& div': {
			fontSize: '20px',
			color: '#000000',
		},
	},

});



const ReminderList = () => {

	const { reminders, setReminders, isLoadingReminder } = useContext(Context);

	const [value, setValue] = useState(new Date());
	const [addModal, setAddModal] = useState(false);
	const [sortOption, setSortOption] = useState('ascending');
	const classes = useStyles();

	const nodeRefs = useRef({});

	//Sort function
	const sortReminders = (option) => {
		if (option === 'ascending') {
			setReminders([...reminders].sort((a, b) => a.date.localeCompare(b.date)));
		} else if (option === 'descending') {
			setReminders([...reminders].sort((a, b) => a.date.localeCompare(b.date)).reverse());
		}
	}

	//Change sort option
	const editSortOption = () => {
		if (sortOption === 'ascending') {
			setSortOption('descending')
			sortReminders('descending')
		} else {
			setSortOption('ascending');
			sortReminders('ascending')
		}
	}


	return (
		<div className='reminders'>
			<ReminderModal visible={addModal} setVisible={setAddModal} />

			<div className='reminders__date-mobile'>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={ruLocale}
				>
					<MobileDateTimePicker
						label="Date"
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
						}}
						readOnly={true}
					/>
				</LocalizationProvider>
			</div>

			<div className="reminders__list">
				<h1 style={{ textAlign: 'center' }}>
					{reminders.length === 0 ? `No Reminders` : <div></div>}
				</h1>
				<Box component="div" sx={{
					'& > :not(style)': { m: 1 },
					display: 'flex',
					justifyContent: 'space-between',
				}}>
					<button className='button__sort' onClick={editSortOption}>
						Sort
						<StraightIcon fontSize="small" className={`button__sort-icon__${sortOption}`}
						/>
					</button>
					<Fab onClick={() => setAddModal(true)}
						aria-label="add"
						size="medium"
						sx={{
							backgroundColor: '#c6d47a',
							color: '#fff',
							'&:hover': {
								backgroundColor: '#939f54',
							}
						}}
					>
						<AddIcon />
					</Fab>
				</Box>

				{/* Reminders */}
				<TransitionGroup>
					{reminders.map((reminder) => {
						if (!nodeRefs.current[reminder._id]) {
							nodeRefs.current[reminder._id] = React.createRef();
						}

						return (
							<CSSTransition
								key={reminder._id}
								nodeRef={nodeRefs.current[reminder._id]}
								timeout={500}
								classNames="reminder"
							>
								<div ref={nodeRefs.current[reminder._id]}>
									<Reminder reminder={reminder} />
								</div>
							</CSSTransition>
						);
					})}
				</TransitionGroup>

				{isLoadingReminder &&
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '10px'
					}}
					>
						<DotPulse
							size={40}
							speed={1.3}
							color="black"
						/>
					</Box>
				}
			</div>

			{/* Clock, calendar */}
			<div className="reminders__date">
				<Clock />
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={ruLocale}
				>
					<DatePicker className={classes.root}
						readOnly={true}
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
						}}
					/>
				</LocalizationProvider>
			</div>
		</div>
	);
}

export default ReminderList;