import React, { useContext, useEffect, useState} from 'react';
import LoginForm from './components/LoginForm'
import {Context} from './index'
import { observer } from 'mobx-react-lite';
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";


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
        <div>
          <button onClick={getUsers}>Get users</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : `Авторизуйтесь`}</h1>
      <h2>{store.user.isActivated ? "Почта подтверждена" : "Требуется подтверждение почтового адресса"}</h2>
      <button onClick={() => store.logout()}>Exit</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map(user => 
        <div key={user.email}>{user.email}</div>
        )}
    </div>
  );
}

export default observer(App);
