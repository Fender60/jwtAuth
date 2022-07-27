import React, {useState} from 'react';
import './LoginForm.scss'
import MyInput from "../../components/myInput/MyInput";
import MyButton from "../../components/myButton/MyButton";
import store from '../../actions/store';
import {observer} from "mobx-react-lite";
import {useAuth} from '../../components/context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const LoginForm = () => {

	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const {signin} = useAuth();

	const login = (e) => {
		e.preventDefault();
		signin(phone, password);
	}
	const navigate = useNavigate();

	//Проверка авторизации, перенаправление на домашнюю страницу
	useEffect(() => {
		const auth = localStorage.getItem('token');
		if(auth) {
			navigate('/home', {replace: true})
		}
	})


    return (
        <div className='auth'>
            <div className="auth__container">
                <div className="auth__content">
                    <div className="auth__title">Вход</div>
                    <form className="auth__form">
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
                        <MyButton onClick = {login}>Вход</MyButton>
                        <MyButton onClick = {() => store.registration(phone, password)}>Регистрация</MyButton>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default observer(LoginForm);