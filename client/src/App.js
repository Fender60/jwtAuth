import React, { useEffect } from 'react';
import './App.scss';
import {observer} from "mobx-react-lite";
import {Routes ,Route, Navigate} from "react-router-dom";
import LoginForm from "./pages/loginForm/LoginForm";
import RegistrationForm from "./pages/registrationForm/RegistrationForm";
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import store from './actions/store';
import PrivateRoute from './components/hoc/PrivateRoute';
import {AuthProvider} from './components/hoc/AuthProvider';

function App() {

	useEffect(() => {
		if(localStorage.getItem('token')) {
			 store.checkAuth();
		}
  }, []);


  return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Layout/>}>
					<Route index element={<Navigate to="home" replace/>}/>

					<Route element={<PrivateRoute/>}>
					<Route path='home' element={<Home/>} exact/>
					</Route>

					<Route path='login' element={<LoginForm/>}/>
					<Route path='registration' element={<RegistrationForm/>}/>
					<Route path='*' element={<Navigate to="home" replace/>}/>
				</Route>
			</Routes>
		</AuthProvider>
  )
}

export default observer(App);
