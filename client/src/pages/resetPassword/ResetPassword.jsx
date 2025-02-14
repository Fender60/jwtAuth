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
		? setError('repeatPassword', { type: 'custom', message: 'The password does not match' })
		: resetPassword(phone, password);
	}

		return (
			<div className='auth'>
				<div className="auth__container">
					<div className="auth__content">
						<div className="auth__title">Password reset</div>

						<div style={{color: 'red'}}>{store.servError.reset}</div>

						<form className="auth__form" onSubmit={handleSubmit(sendData)}>
							<div className='auth__form-item'>
								<label className='auth__form-label'>New Password
								<input className='auth__form-input'
								{...register('password', {
									minLength: 8,
									required: 'The field is required'
								})}
									value={password} 
									onChange = {(e) => setPassword(e.target.value)} 
									type= {isChecked ? 'text' : 'password'} 
									placeholder='Enter new password'
									autoComplete="new-password"
								/>
								</label>
								<div className='auth__form-error'>{errors?.password && <p>{errors?.password?.message || 'The password should be at least 8 characters'}</p>}</div>
							</div>
							<div className='auth__form-item'>
								<label className='auth__form-label'>Repeat Password
									<input className='auth__form-input' 
										{...register('repeatPassword', {
											required: 'The field is required'
										})}
										value={repeatPassword} 
										onChange = {(e) => setrepeatPassword(e.target.value)} 
										type= {isChecked ? 'text' : 'password'}
										placeholder='Repeat password'
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
									Show the password
									</label>
								</div>
							</div>
								<MyButton>Save</MyButton> 
						</form>
					</div>
				</div>
			</div>
		);
};

export default observer(ResetPassword);