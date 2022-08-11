import React, {useState} from 'react';
import { Controller, useForm } from "react-hook-form";
import MyButton from "../../components/myButton/MyButton";
import store from '../../actions/store';
import styles from'./RegistrationForm.module.css';
import NumberFormat from "react-number-format";
import { useAuth } from '../../components/context/useAuth';
import {observer} from 'mobx-react-lite';

const Registration = () => {

	const { register, handleSubmit, control, setError, formState: { errors } } = useForm({
		mode: "onBlur",
	});
	

	const {registration} = useAuth();

	const [phone, setPhone] = useState('0');
	const [password, setPassword] = useState('');
	const [repeatPassword, setrepeatPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const sendData = () => {
		let editPhone = '38' + phone;
		password !== repeatPassword
		? setError('repeatPassword', { type: 'custom', message: 'Пароль не совпадает' })
		: registration(editPhone, password);
	}

		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Регистрация</div>

						<div style={{color: 'red'}}>{store.servError.registration}</div>

						<form className="auth__form" onSubmit={handleSubmit(sendData)}>
							<div className='auth__form-item'>
								<label className='auth__form-label'> Номер телефона
									<Controller
										control={control}
										name = 'phone'
										rules={{required: 'Поле обязательно для заполнения',
										pattern: /^\+38\s+\(0\d{2}\)\s\d{3}-\d{2}-\d{2}/}}
										render={({field: {onBlur, onChange, onSubmit}, fieldState: {error}}) => (
											<NumberFormat className='auth__form-input'
												onSubmit = {onSubmit}
												onBlur = {onBlur}
												onChange = {onChange}
												value={phone} 
												type={'tel'} 
												format="+38 (###) ###-##-##" 
												mask="_"
												onValueChange= {(values) => {
													const {value} = values
													setPhone(value)
												}}
											/>
										)}
									/>
								</label>
								<div className='auth__form-error'>{errors?.phone && <p>{errors?.phone?.message || 'Не верный формат номера телефона'}</p>}</div>
							</div>

							<div className='auth__form-item'>
								<label className='auth__form-label'>Пароль
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
								<MyButton>Регистрация</MyButton> 
						</form>
					</div>
				</div>
			</div>
		);
};

export default observer(Registration);