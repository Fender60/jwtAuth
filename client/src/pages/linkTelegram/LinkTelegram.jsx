import React from 'react';
import '../../static/scss/login_registartion.scss';
import classes from './Link.module.css';
import MyButton from '../../components/myButton/MyButton';


const LinkTelegram = () => {

		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Registration</div>
							<div className={classes.text}>
								Follow the link below to confirm the phone number and complete the registration
							</div>
							<div className={classes.link}><a href='http://t.me/MsgRemBot'>http://t.me/MsgRemBot</a></div>
							<a href='http://localhost:3000/home'><MyButton>Home</MyButton></a>
					</div>
				</div>

		</div>
	);
};

export default LinkTelegram;