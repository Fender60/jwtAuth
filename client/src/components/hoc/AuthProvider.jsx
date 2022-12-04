import {createContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../../actions/store';

export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {

	const navigate = useNavigate();
	const location = useLocation();

	const fromPage = location.state?.from?.pathname || '/';

	function signin(phone, password) {
		store.login(phone, password)
		.then(() => {
			if(store.servError.error ) {
				navigate('/error', {replace: true})
			} else 
			if(!store.servError.login) {
				navigate(fromPage, {replace: true})
			}
		});
	}

	const signout = () => {
		store.logout()
		.then(() => navigate('/login', {replace: true})) //Перенаправление на страницу входа
	}

	const registration = (phone, password) => {
		store.registration(phone, password)
		.then(() => {
			if (store.servError.error) {
				navigate('/error', {replace: true})
			} else if(store.isAuth){
				navigate('/link', {replace: true})
			}
		})
	}

	const resetPassword = (phone, password) => {
		store.resetPassword(phone, password)
		.then(() => {
			if (store.servError.error) {
				navigate('/error', {replace: true})
			} else if(store.isAuth){
				navigate('/home', {replace: true})
			}
		})
	}

	const value = {signin, signout, registration, resetPassword}

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>

}
