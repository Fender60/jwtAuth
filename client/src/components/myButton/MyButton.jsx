import React from 'react';
import './myButton.scss'

const MyButton = (props) => {
    return (
        <div className='btn'>
            <button onClick={props.onClick}>{props.name}</button>
        </div>
    );
};

export default MyButton;