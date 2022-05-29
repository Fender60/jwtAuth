import React, {useState} from 'react';
import './LoginForm.scss'
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import store from '../../actions/store';
import {observer} from "mobx-react-lite";



const LoginForm = () => {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='auth'>
            <div className="auth__container">
                <div className="auth__content">
                    <div className="auth__title">Вход</div>
                    <form action="#" className="auth__form">
                        <div style={{color: 'red'}}>{store.servError}</div>
                        <MyInput
                        	value={phone}
                        	onChange = {(e) => setPhone(e.target.value)}
                        	type='tel'
                        	placeholder='Номер телефона'/>
                        <MyInput 
									value={password} 
									onChange = {(e) => setPassword(e.target.value)} 
									type='password' 
									placeholder='Пароль'
								/>
                        <MyButton onClick = {() => store.login(phone, password)}>Вход</MyButton>
                        <MyButton onClick = {() => store.registration(phone, password)}>Регистрация</MyButton>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default observer(LoginForm);