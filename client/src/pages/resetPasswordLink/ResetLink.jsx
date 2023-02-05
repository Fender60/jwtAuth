import React from 'react';
import '../../static/scss/login_registartion.scss';
import classes from './Link.module.css';


const ResetLink = () => {

		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Сброс пароля</div>
							<div className={classes.text}>
								Для сброса пароля перейдите в телеграмм бот и выберите в разделе меню сброс пароля
							</div>
							<div className={classes.link}><a href='http://t.me/MsgRemBot'>http://t.me/MsgRemBot</a></div>
					</div>
				</div>

		</div>
	);
};

export default ResetLink;