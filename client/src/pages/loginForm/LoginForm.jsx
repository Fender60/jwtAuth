import React, {useState} from 'react';
import '../../static/scss/login_registartion.scss'
import MyButton from "../../components/myButton/MyButton";
import store from '../../actions/store';
import {useAuth} from '../../components/context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PatternFormat } from 'react-number-format';
import { Controller, useForm } from "react-hook-form";
import {observer} from 'mobx-react-lite';


const LoginForm = () => {

	const [phone, setPhone] = useState('0');
	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const { register, handleSubmit, control, formState: { errors } } = useForm({
		mode: "onBlur",
	});

	const {signin} = useAuth();

	const login = () => {
		let editPhone = '38' + phone;
		signin(editPhone, password);
	}
	const navigate = useNavigate();

	//Authorization check, redirection to the home page
	useEffect(() => {
		if(store.isAuth) {
			navigate('/home', {replace: true})
		}
	})


		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Log in</div>
						<form className="auth__form" onSubmit={handleSubmit(login)}>
							
							<div style={{color: 'red'}}>{store.servError.login}</div>

							<div className='auth__form-item'>
								<label className='auth__form-label'> Phone number
									<Controller
										control={control}
										name = 'phone'
										rules={{required: 'The field is required',
										pattern: /^\+38\s+\(0\d{2}\)\s\d{3}-\d{2}-\d{2}/}}
										render={({field: {onBlur, onChange, onSubmit}, fieldState: {error}}) => (
											<PatternFormat className='auth__form-input'
												onSubmit = {onSubmit}
												onBlur = {onBlur}
												onChange = {onChange}
												value={phone} 
												type={'tel'} 
												format="+38 (###) ###-##-##" 
												allowEmptyFormatting mask="_"
												onValueChange= {(values) => {
													const {value} = values
													setPhone(value)
												}}
											/>
										)}
									/>
								</label>
								<div className='auth__form-error'>{errors?.phone && <p>{errors?.phone?.message || 'Incorrect phone number format'}</p>}</div>
							</div>
							<div className='auth__form-item'>
									<label className='auth__form-label'>Password
										<input className='auth__form-input'
										{...register('password', {
											required: 'The field is required'
										})}
											value={password} 
											onChange = {(e) => setPassword(e.target.value)} 
											type= {isChecked ? 'text' : 'password'} 
											placeholder='Enter the password'
										/>
									</label>
									<div className='auth__form-error'>{errors?.password && <p>{errors?.password?.message || 'Password entering error'}</p>}</div>
									<div className='auth__form-checkbox'>
										<label>
											<input 
											type="checkbox"
											checked = {isChecked}
											onChange={e => {setIsChecked(e.target.checked)}}
											/>
										Show the password
										</label>
									</div>
							</div>
							<MyButton>Login</MyButton>
						</form>
						<a className='auth__reset_password' href="/resetpassword" to="/registration">Forgot the password?</a>
					</div>
				</div>

		</div>
	);
};

export default observer(LoginForm);