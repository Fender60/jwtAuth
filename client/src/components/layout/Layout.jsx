import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
		<header>
			<NavLink to="/login">Вход</NavLink>
			<NavLink to="/registration">Регистрация</NavLink>
		</header>

		<Outlet/>

		</>
	);
};

export default Layout;