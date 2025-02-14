import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.scss'

const Layout = () => {
	return (
		<>

		<header className='header__login'>
			<div className="header__login__logo"></div>
			<div className="header__login__link">
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/registration">Registration</NavLink>
			</div>
		</header>

		<Outlet/>

		<footer>
		</footer>


		</>
	);
};

export default Layout;