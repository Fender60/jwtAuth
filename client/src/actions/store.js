import {makeAutoObservable} from "mobx";
import $api, {API_URL} from "../http";
import axios from "axios";

class Store {

    user = {};
    isAuth = false;
    isLoading = false;

    servError = '';

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }



    async login(phone, password) {
        try {
            const response = await $api.post('/login', {
                phone,
                password
            });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            this.servError = e.response?.data?.message;
        }
    }

    async registration(phone, password) {
        try {
            const response = await $api.post('/registration',
                {
                    phone, password
                });

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }catch (e){
            this.servError = e.response?.data?.message;
        }
    }

    async logout() {
        try {
            const response = await $api.post('/logout');

            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        }catch (e){
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

        } catch (e) {
            console.log(e.response?.data?.message);
        }
        finally {
            this.setLoading(false);
        }
    }

}

export default new Store();