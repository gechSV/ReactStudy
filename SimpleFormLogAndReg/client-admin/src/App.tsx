import { useContext, useEffect} from 'react';
import {Context} from './index'
import { observer } from 'mobx-react-lite';

import LoginForm from './components/LoginForm'
import Header from './components/Header';
import ContentContainer from './components/ContentContainer';


const App = () => {
  const {store} = useContext(Context);

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