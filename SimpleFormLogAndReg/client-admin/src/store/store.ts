import { IUser } from "../models/IUser";
import {makeAutoObservable} from 'mobx';
import AuthService from "../services/AuthService";
import { AuthResponse } from "../models/response/AuthResponse";
import axios from "axios";
import {API_URL} from '../http'
import ProductService from "../services/ProductService";
import { ProductResponse } from "../models/response/ProductResponse";
import React, { useContext, useEffect, useState} from 'react';
import { IProduct } from "../models/response/IProduct";

export default class Store{
    user = {} as IUser;
    isAuth = false;
    isLoading = false; 

    isOpenProductTable = false;
    isOpenAddProductWindow = false;
    products = {} as IProduct[];

    constructor(){ 
        makeAutoObservable(this);
    }

    setAuth(bool: boolean){
        this.isAuth = bool;
    }

    setUser(user: IUser){
        this.user = user; 
        // console.log('setUser' , JSON.stringify(user))
    }

    setLoading(bool: boolean){
        this.isLoading = bool;
    }

    setOpenProductTable(bool: boolean){
        this.isOpenProductTable = bool;
    };

    setProducts(products: IProduct[]){
        this.products = products;
    }

    async login(email: string, password: string){
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accesToken);
            this.setAuth(true);
            console.log("response.data.user " + response.data.user.email)
            this.setUser(response.data.user);
            console.log('login', response, 'user' ,this.user.email)
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
            console.log('store registration' + response.data);
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
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
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
        }finally{
            this.setLoading(false);
        }
    }

    async openProductTable(){
        try {
            const response = await ProductService.getAllProducts();
            this.setProducts(response.data.products);
            console.log("products: ", response.data.products)
            console.log("products: ", this.products[1])
            this.setOpenProductTable(true);
        } catch (e) {
            if (e instanceof Error){
                console.log(e.message);
            }
            else{
                console.log('Unexcepted error', e);
            }
        }
    }

    async openAddProductWindow(){
        try {
            this.isOpenAddProductWindow = true;
        } catch (e) {
            if (e instanceof Error){
                console.log(e.message);
            }
            else{
                console.log('Unexcepted error', e);
            }
        }
    }

}