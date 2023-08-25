import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./store/authStore"
import './style/style.css'
import ProductStore from './store/productStore';
// import 'bootstrap/dist/css/bootstrap.min.css'

interface State {
  store: Store,
  productStore: ProductStore,
}

export const store = new Store();
export const productStore = new ProductStore();

export const Context = createContext<State>({
    store, productStore
})

ReactDOM.render(
    <Context.Provider value={{
        store, productStore 

    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);