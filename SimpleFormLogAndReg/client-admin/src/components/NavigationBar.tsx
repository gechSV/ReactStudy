import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NavigationBar: FC = () => {
    const {store} = useContext(Context);

    return(
        <div className='NavigationBar'>
            <button onClick={() => store.openProductTable()}>Товары</button>
        </div>
    )
}

export default observer(NavigationBar);