import React, { useState } from 'react';
import '../reminder/Reminder';
import Reminder from '../reminder/Reminder';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Box, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './reminderList.scss'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { CalendarPicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { makeStyles } from '@mui/styles';
import Clock from '../clock/Clock';
import ReminderModal from '../Remindermodal/ReminderModal';




const useStyles = makeStyles({
	root: {
		'& span': {
			color: '#000',
			fontSize: '16px'
		},
		'& .MuiPickersArrowSwitcher-button': {
			color: '#f9ffb5'
		},
		'& div': {
			fontSize: '20px'
		},
		'& .MuiPickersDay-root': {
			background: '#f9ffb5',
			fontSize: '15px',
			'&:hover': {
				background: '#e0e88b'
			}
		},
		'& .Mui-disabled': {
			
		},
		'& .MuiPickersDay-today': {
			background: '#fee79a'
		},
	},

 });



const ReminderList = ({reminders}) => {

	const [value, setValue] = useState(new Date());
	const [addModal, setAddModal] = useState(false);
	

	const classes = useStyles();
	return (
		<div className='reminders'>
			<ReminderModal visible={addModal} setVisible={setAddModal}/>

			<div className='reminders__date-mobile'>
				<LocalizationProvider 
					dateAdapter={AdapterDateFns}
					adapterLocale={ruLocale}
				>
				<MobileDateTimePicker
					label="Текущая дата"
					value={value}
					onChange={(newValue) => {
					setValue(newValue);
					}}
					readOnly = {true}
					renderInput={(params) => <TextField {...params} />}
				/>
				</LocalizationProvider>
			</div>

			<div className="reminders__list">
				<h1 style={{textAlign: 'center'}}>
					{reminders.length === 0 ? `Напоминания отсутствуют` : <div></div>}
				</h1>
				<Box component="div"  sx={{ 
					'& > :not(style)': { m: 1 },
					display: 'flex',
					justifyContent: 'flex-end',
					}}>
				<Fab onClick={() => setAddModal(true)} 
				aria-label="add" 
				size="medium"
				sx = {{
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

				<TransitionGroup>
				{reminders.map((reminder) => 
				<CSSTransition
					key ={reminder._id}
					timeout={500}
					classNames="reminder"
				>
				<Reminder reminder = {reminder}/>
				</CSSTransition>
				)}
				</TransitionGroup>
			</div>
			<div className="reminders__date">
				<Clock/>
				<LocalizationProvider 
					dateAdapter={AdapterDateFns}
					adapterLocale={ruLocale}
				>
					<CalendarPicker className={classes.root}
						readOnly = {true}
						value={value}
						onChange={(newValue) => {
						setValue(newValue);
					 }}
					/>
				</LocalizationProvider>
			</div>
		</div>
	);
};

export default ReminderList;