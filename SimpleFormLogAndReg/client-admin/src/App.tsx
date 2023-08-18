import React, { useContext, useEffect, useState} from 'react';
import {Context} from './index'
import { observer } from 'mobx-react-lite';
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
// import './style/style.css'

import LoginForm from './components/LoginForm'
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import ContentContainer from './components/ContentContainer';

const App = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
        store.checkAuth();
    }
  }, [])

  if(!store.isAuth){
    return(
      <div>
        <LoginForm/>
      </div>
    );
  }

  return (
    <div className="App">
      <Header/>
      <ContentContainer/>
    </div>
  );
}

export default observer(App);