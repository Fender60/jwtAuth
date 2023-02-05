import React, {useState} from 'react';
import '../../static/scss/login_registartion.scss'
import MyButton from "../../components/myButton/MyButton";
import store from '../../actions/store';
import {useAuth} from '../../components/context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Controller, useForm } from "react-hook-form";
import {observer} from 'mobx-react-lite';


const LoginForm = () => {

	const [phone, setPhone] = useState('0');
	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const { register, handleSubmit, control, formState: { errors } } = useForm({
		mode: "onBlur",
	});

	const {signin, auth} = useAuth();

	const login = () => {
		let editPhone = '38' + phone;
		signin(editPhone, password);
	}
	const navigate = useNavigate();

	//Проверка авторизации, перенаправление на домашнюю страницу
	useEffect(() => {
		if(store.isAuth) {
			navigate('/home', {replace: true})
		}
	})


		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Вход</div>
						<form className="auth__form" onSubmit={handleSubmit(login)}>
							
							<div style={{color: 'red'}}>{store.servError.login}</div>

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
											required: 'Поле обязательно для заполнения'
										})}
											value={password} 
											onChange = {(e) => setPassword(e.target.value)} 
											type= {isChecked ? 'text' : 'password'} 
											placeholder='Введите пароль'
										/>
									</label>
									<div className='auth__form-error'>{errors?.password && <p>{errors?.password?.message || 'Ошибка ввода пароля'}</p>}</div>
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
							<MyButton>Вход</MyButton>
						</form>
						<a className='auth__reset_password' href="#">Забыли пароль?</a>
					</div>
				</div>

		</div>
	);
};

export default observer(LoginForm);