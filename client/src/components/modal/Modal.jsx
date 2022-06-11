import React from 'react';
import classes from './Modal.module.css';

const Modal = ({children, visible, setVisible}) => {

	const rootClass = [classes.modal];

	if(visible){
		rootClass.push(classes.active);
	}

	return (
		<div className={rootClass.join(' ')}
			onClick = {() => setVisible(false)}>
			<div className={classes.content} onClick = {(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;