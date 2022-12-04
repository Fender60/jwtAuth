import {makeAutoObservable, configure} from "mobx";
import $api, {API_URL} from "../http";
import axios from "axios";


class Store {

	user = {};
	isAuth = localStorage.getItem('token');
	isLoading = false;
	servError = {};


	constructor() {
		makeAutoObservable(this);
		configure({
		enforceActions: "never",
	})
	}


	setAuth(token) {
		this.isAuth = token;
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
			this.setAuth(localStorage.getItem('token'));
			this.setUser(response.data.user);
			this.servError = {};
		} catch (e) {
			e.response?.data?.message 
			? this.servError.login = e.response?.data?.message
			: this.servError.error = e;
			console.log(this.servError.error);
		}
	}

	async registration(phone, password) {
		try {
			const response = await $api.post('/registration',
					{
						phone, password
					});
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(localStorage.getItem('token'));
			this.setUser(response.data.user);
			this.servError = {};
		}catch (e){
			e.response?.data?.message 
			? this.servError.registration = e.response?.data?.message
			: this.servError.error = e;
		}
	}

	async resetPassword(phone, password) {
		try {
			const response = await $api.patch('/resetpassword',
			{
				phone, password
			});

			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(localStorage.getItem('token'));
			this.setUser(response.data.user);
			this.servError = {};
		} 
		catch (e) {
			e.response?.data?.message 
			? this.servError.reset = e.response?.data?.message
			: this.servError.error = e;
		}
	}

	async fetchReminders() {
	try {
		const response = await $api.get('/reminders', {withCredentials: true});
		this.servError = {};
		return response.data;
	} catch (e) {
		this.servError.fetch = e.response?.data?.message;
	}
}

	async logout() {
		try {
			const response = await $api.post('/logout');
			localStorage.removeItem('token');
			this.setAuth('');
			this.setUser({});
			this.servError = {};
		}catch (e){
			console.log(e.response?.data?.message);
		}
	}

	async checkAuth() {
		this.setLoading(true);
		try {
			const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
			localStorage.setItem('token', response.data.accessToken);
			this.setAuth(localStorage.getItem('token'));
			this.setUser(response.data.user);
			this.servError = {};
		} catch (e) {
			localStorage.removeItem('token');
			e.response?.data?.message 
			? this.servError.checkAuth = e.response?.data?.message
			: this.servError.error = e;
		}
		finally {
			this.setLoading(false);
		}
	}

	async addReminder(date,  text) {
		try {
			const response = await $api.post('/add', {
					date,
					//time,
					text
			});
		} catch (e) {
			this.servError.add = e.response?.data?.message;
		} 
	}

	async removeReminder(reminderId) {
		try {
			const response = await $api.post('/delete', {
				reminderId
			});
		} catch (e) {
			this.servError.remove = e.response?.data?.message;
		}
	}

	async editReminder(date, text, id){
		try {
			const response = await $api.put('/edit', {
				date,
				text,
				id
			});
		} catch (e) {
			this.servError.edit = e.response?.data?.message;
		}
	}

}

export default new Store();