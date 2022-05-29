import React from 'react';
import './myButton.scss'

const MyButton = ({children, ...props}) => {
    return (
        <div>
            <button className='btn' {...props}>{children}</button>
        </div>
    );
};

export default MyButton;