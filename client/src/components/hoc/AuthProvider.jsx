import {createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../../actions/store';

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {

	const[auth, setAuth] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const fromPage = location.state?.from?.pathname || '/';

	function signin(phone, password) {
		store.login(phone, password)
		.then(() => navigate(fromPage, {replace: true}));
	}

	const signout = () => {
		store.logout()
		.then(() => navigate('/login', {replace: true})) //Перенаправление на страницу входа
	}

	const value = {auth, signin, signout}

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>

}
