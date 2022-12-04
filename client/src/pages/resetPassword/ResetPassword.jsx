import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import MyButton from "../../components/myButton/MyButton";
import store from '../../actions/store';
import { useAuth } from '../../components/context/useAuth';
import {observer} from 'mobx-react-lite';
import '../../static/scss/login_registartion.scss'

const ResetPassword = () => {

	const { register, handleSubmit, setError, formState: { errors } } = useForm({
		mode: "onBlur",
	});
	

	const {resetPassword} = useAuth();
	const {phone} = useParams();

	const [password, setPassword] = useState('');
	const [repeatPassword, setrepeatPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const sendData = () => {
		password !== repeatPassword
		? setError('repeatPassword', { type: 'custom', message: 'Пароль не совпадает' })
		: resetPassword(phone, password);
	}

		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Сброс пароля</div>

						<div style={{color: 'red'}}>{store.servError.reset}</div>

						<form className="auth__form" onSubmit={handleSubmit(sendData)}>
							<div className='auth__form-item'>
								<label className='auth__form-label'>Новый пароль
								<input className='auth__form-input'
								{...register('password', {
									minLength: 8,
									required: 'Поле обязательно для заполнения'
								})}
									value={password} 
									onChange = {(e) => setPassword(e.target.value)} 
									type= {isChecked ? 'text' : 'password'} 
									placeholder='Введите пароль'
									autoComplete="new-password"
								/>
								</label>
								<div className='auth__form-error'>{errors?.password && <p>{errors?.password?.message || 'Пароль должен быть не менее 8 символов'}</p>}</div>
							</div>
							<div className='auth__form-item'>
								<label className='auth__form-label'>Введите пароль еще раз
									<input className='auth__form-input' 
										{...register('repeatPassword', {
											required: 'Поле обязательно для заполнения'
										})}
										value={repeatPassword} 
										onChange = {(e) => setrepeatPassword(e.target.value)} 
										type= {isChecked ? 'text' : 'password'}
										placeholder='Введите пароль'
									/>
								</label>
								<div className='auth__form-error'>{errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'error'}</p>}</div>
								<div className='auth__form-checkbox'>
									<label>
									<input 
									type="checkbox"
									checked = {isChecked}
									onChange={e => {setIsChecked(e.target.checked)}}
									/>
									Показать пароль
									</label>
								</div>
							</div>
								<MyButton>Сохранить</MyButton> 
						</form>
					</div>
				</div>
			</div>
		);
};

export default observer(ResetPassword);