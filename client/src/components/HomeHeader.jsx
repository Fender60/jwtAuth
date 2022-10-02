import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from './context/useAuth';



function HideOnScroll(props) {
	const { children, window } = props;

	const trigger = useScrollTrigger({
	  target: window ? window() : undefined,
	});
 
	return (
	  <Slide appear={false} direction="down" in={!trigger}>
		 {children}
	  </Slide>
	);
 }

const HomeHeader = (props) => {

	const {signout} = useAuth();


	return (
		<>
			<HideOnScroll {...props}>
				<AppBar>
					<Toolbar 
						sx = {{
							backgroundColor: '#9cb6ad',
						}}
					>
						<Typography
						variant="h6"
						noWrap
						component="span"
						sx={{
						flexGrow:1,
						mr: 2,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'inherit',
						textDecoration: 'none',
						backgroundColor: '#9cb6ad',
						}}
						>
						LOGO
						</Typography>
						<Button 
						variant="text"
						size ="large"
						endIcon={<LogoutIcon />}
						color="inherit"
						onClick={signout}
						>
						Выход
						</Button>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			
		</>
	);
};

export default HomeHeader;