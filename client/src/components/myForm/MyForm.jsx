import React, {useState} from 'react';
import './myForm.scss'
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import store from '../../actions/store';
import {observer} from "mobx-react-lite";



const MyForm = () => {

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
                                 setValue={setPhone}
                                 type='tel'
                                 placeholder='Номер телефона'/>
                        <MyInput value={password} setValue={setPassword} type='password' placeholder='Пароль'/>
                        <MyButton name="Вход" onClick = {() => store.login(phone, password)} />
                        <MyButton name="Регистрация" onClick = {() => store.registration(phone, password)}/>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default observer(MyForm);