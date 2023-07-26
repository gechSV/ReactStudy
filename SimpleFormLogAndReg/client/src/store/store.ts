import { IUser } from "../models/IUser";
import {makeAutoObservable} from 'mobx';
import AuthService from "../services/AuthService";
import { AuthResponce } from "../models/responce/AuthResponce";
import axios from "axios";

export default class Store{
    user = {} as IUser;
    isAuth = false;

    constructor(){ 
        makeAutoObservable(this);
    }

    setAuth(bool: boolean){
        this.isAuth = bool;
    }

    setUser(user: IUser){
        this.user = user;
    }

    async login(email: string, password: string){
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accesToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            if(err instanceof Error){
                console.log(err.message);
            }
            else{
                console.log('Unexpected error', err);
            }
        }
    }

    async registration(email: string, password: string){
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accesToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            if (error instanceof Error){
                console.log(error.message);
            }
            else{
                console.log('Unexcepted error', error);
            }
        }
    }

    async logout(){
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (error) {
            if (error instanceof Error){
                console.log(error.message);
            }
            else{
                console.log('Unexcepted error', error);
            }
        }
    }

    async checkAuth(){ 
        try {
            const response = await axios.get<AuthResponce> (`$API_URL/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accesToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (err) {
            if(err instanceof Error){
                console.log(err.message);
            }
            else{
                console.log('Unexcepted error', err);
            }
        }
    }

}