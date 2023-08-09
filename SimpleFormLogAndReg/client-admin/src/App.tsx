import React, { useContext, useEffect, useState} from 'react';
import {Context} from './index'
import { observer } from 'mobx-react-lite';
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import './style/style.css'

import LoginForm from './components/LoginForm'
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import ProductTable from './components/ProductTable/ProductTable';


const App = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
        store.checkAuth();
    }
  }, [])

  async function getUsers(){
    try {
      const response = await UserService.fetchUsers();
       setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  if(store.isLoading){
    return (<div>Loading...</div>)
  }

  if(!store.isAuth){
    return(
      <div>
        <LoginForm/>
      </div>
    );
  }

  if(store.isOpenProductTable){
    return (
      <div className="App">
        <Header/>
        <ProductTable/>
      </div>
    )
  }

  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default observer(App);