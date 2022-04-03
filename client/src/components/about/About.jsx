import React, {useState} from 'react';
import MyInput from "../myInput/MyInput";
import MyButton from "../myButton/MyButton";
import store from "../../actions/store";

const About = () => {

    const [task, setTask] = useState('');

    return (
        <div className="content">
            <div className="content__container">
                <MyInput value={task} setValue={setTask} type='text' placeholder='Введите текст напонимания'/>
                    <MyButton name='Добавить'/>
                    <MyButton name='Выйти' onClick={()=> store.logout()}/>
            </div>
        </div>
    );
};

export default About;