import React, { useContext, useEffect } from 'react';
import LoginForm from './components/LoginForm'
import {Context} from './index'
import { observer } from 'mobx-react-lite';
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";


function App() {
  const {store} = useContext(Context);
  console.log(store)

  useEffect(() => {
    if (localStorage.getItem('token')) {
        store.checkAuth()
    }
  }, [])

  if(!store.isAuth){
    return(
      <LoginForm/>
    )
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store}` : `Авторизуйтесь`}</h1>
      <button onClick={() => store.logout()}>Exit</button>
    </div>
  );
}

export default observer(App);
