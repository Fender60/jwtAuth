import React, { useEffect } from 'react';
import '../src/static/scss/App.scss';
import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/loginForm/LoginForm";
import RegistrationForm from "./pages/registrationForm/RegistrationForm";
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import store from './actions/store';
import PrivateRoute from './components/hoc/PrivateRoute';
import { AuthProvider } from './components/hoc/AuthProvider';
import LinkTelegram from './pages/linkTelegram/LinkTelegram';
import ErrorPage from './pages/ErrorPage';
import ResetPassword from './pages/resetPassword/ResetPassword';
import ResetLink from './pages/resetPasswordLink/ResetLink';

function App() {

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth();
		}
	}, []);


	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Navigate to="/home" replace />} />
					<Route path='login' element={<LoginForm />} />
					<Route path='registration' element={<RegistrationForm />} />
				</Route>

				{/* Private routers */}
				<Route element={<PrivateRoute />}>
					<Route path='home' element={<Home />} exact />
					<Route path='link' element={<LinkTelegram />} />
				</Route>

				<Route path='resetpassword/:phone' element={<ResetPassword />} />
				<Route path='resetpassword' element={<ResetLink />} />

				<Route path='error' element={<ErrorPage />} />
				<Route path='*' element={<Navigate to="/home" replace />} />
			</Routes>
		</AuthProvider>
	)
}

export default observer(App);
