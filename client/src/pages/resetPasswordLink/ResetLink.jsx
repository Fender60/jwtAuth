import React from 'react';
import '../../static/scss/login_registartion.scss';
import classes from './Link.module.css';


const ResetLink = () => {

		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Password reset</div>
							<div className={classes.text}>
								To reset the password, go to the telegram bot and select password reset in the menu section
							</div>
							<div className={classes.link}><a href='http://t.me/MsgRemBot'>Link</a></div>
					</div>
				</div>

		</div>
	);
};

export default ResetLink;