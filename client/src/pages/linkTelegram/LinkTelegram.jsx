import React from 'react';
import '../../static/scss/login_registartion.scss';
import classes from './Link.module.css';


const LinkTelegram = () => {

		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Регистрация</div>
							<div className={classes.text}>
								Перейдите по ссылке ниже для подтверждения номера телефона
							</div>
							<div className={classes.link}><a href='http://t.me/MsgRemBot'>http://t.me/MsgRemBot</a></div>
					</div>
				</div>

		</div>
	);
};

export default LinkTelegram;