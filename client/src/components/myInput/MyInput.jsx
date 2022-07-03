import React from 'react';
import './MyInput.scss'

const MyInput = (props) => {

    return (
        <div>
            <input className='input' {...props}/>
        </div>
    );
};

export default MyInput;