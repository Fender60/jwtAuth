import React, {useState} from 'react';
import './RegistrationForm.scss'
import MyInput from "../../components/myInput/MyInput";
import MyButton from "../../components/myButton/MyButton";
import store from '../../actions/store';



const Registration = () => {

	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setrepeatPassword] = useState('');


    return (
        <div className='auth'>
            <div className="auth__container">
                <div className="auth__content">
                    <div className="auth__title">Регистрация</div>
                    <form className="auth__form">
                        <div style={{color: 'red'}}>{store.servError}</div>
                        <MyInput
                        	value={phone}
                        	onChange = {(e) => setPhone(e.target.value)}
                        	type='tel'
                        	placeholder='Номер телефона'
									/>
                        <MyInput 
									value={password} 
									onChange = {(e) => setPassword(e.target.value)} 
									type='password' 
									placeholder='Пароль'
									autocomplete="new-password"
								/>
								<MyInput 
									value={repeatPassword} 
									onChange = {(e) => setrepeatPassword(e.target.value)} 
									type='password' 
									placeholder='Повторите пароль'
								/>
								{password === repeatPassword 
								? <MyButton onClick = {() => store.registration(phone, password)}>Регистрация</MyButton> 
								: <div style={{color: 'red'}}>
									Пароли не совпадают
									<MyButton disabled>Регистрация</MyButton>
									</div>}
                        
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Registration;