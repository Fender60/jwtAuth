import './App.scss';
import LoginForm from "./components/loginForm/LoginForm";
import {useEffect} from "react";
import store from "./actions/store";
import {observer} from "mobx-react-lite";
import About from "./components/about/About";


function App() {

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if(store.isLoading){
        return (<div>Загрузка...</div>)
    }

    if(!store.isAuth){
        return (<LoginForm/>);
    }

  return (
    <div className="App">
        <div className="App__container">
            <h1>{store.isAuth ? `Пользователь авторизован` : `Авторизуйся`}</h1>
            <h2>{store.user.isActivated ? `Аккаунт активирован` : `Активируйте аккаунт`}</h2>
            <About/>
        </div>
    </div>
  );
}

export default observer(App);
