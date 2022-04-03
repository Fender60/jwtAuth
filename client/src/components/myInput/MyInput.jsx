import React from 'react';
import './MyInput.scss'

const MyInput = (props) => {

    return (
        <div className='input'>
            <input
                onChange={(e) => props.setValue(e.target.value)}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default MyInput;