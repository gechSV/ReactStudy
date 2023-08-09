import {FC, useContext, useState} from 'react';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';

import NavigationBar from './NavigationBar';


const Header: FC = () => {

    const {store} = useContext(Context); 

    return (
        <div>
            <div className='header'>
                <a href='#'>
                    {store.user.email}
                </a>
                <button onClick={() => store.logout()}>
                    Выход
                </button>
            </div>    
            <NavigationBar/>
        </div>
    )
}

export default observer(Header);