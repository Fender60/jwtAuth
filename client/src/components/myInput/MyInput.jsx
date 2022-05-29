import React from 'react';
import './MyInput.scss'

const MyInput = (props) => {

    return (
        <div className='input'>
            <input {...props}/>
        </div>
    );
};

export default MyInput;