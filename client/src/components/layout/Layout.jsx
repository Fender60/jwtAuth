import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
		<header>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/registration">Registration</NavLink>
		</header>

		<Outlet/>

		</>
	);
};

export default Layout;