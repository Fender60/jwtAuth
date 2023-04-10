import React, { useState, useContext} from 'react';
import '../reminder/Reminder';
import { Context } from '../context/Context';
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
import StraightIcon from '@mui/icons-material/Straight';
import { DotPulse } from '@uiball/loaders'



//Стили для календаря
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



const ReminderList = () => {

	const {reminders, setReminders, isLoadingReminder} = useContext(Context);

	const [value, setValue] = useState(new Date());
	const [addModal, setAddModal] = useState(false);
	const [sortOption, setSortOption] = useState('ascending');
	const classes = useStyles();

	//Функция сортировки
	const sortReminders = (option) => {
		if(option === 'ascending'){
			setReminders([...reminders].sort((a, b) => a.date.localeCompare(b.date)));
		} else if(option ==='descending'){
			setReminders([...reminders].sort((a, b) => a.date.localeCompare(b.date)).reverse());
		}
	}

	//Изменение опций сортировки
	const editSortOption = () => {
		if(sortOption === 'ascending'){
			setSortOption('descending')
			sortReminders('descending')
		}else {
			setSortOption('ascending');
			sortReminders('ascending')
		}
	}


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
					justifyContent: 'space-between',
					}}>
					<button className='button__sort' onClick={editSortOption}>
							Сортировка
							<StraightIcon fontSize="small" className={`button__sort-icon__${sortOption}`}
							/>
						</button>
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

				{/* Напоминания */}
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
				{isLoadingReminder &&
					<Box sx = {{
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

			{/* Часы, календарь */}
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
	}

export default ReminderList;