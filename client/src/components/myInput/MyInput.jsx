import React from 'react';
import './MyInput.scss'

const MyInput = (props) => {

    return (
        <div>
            <input className='form__input' {...props}/>
        </div>
    );
};

export default MyInput;