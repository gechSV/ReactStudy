import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NavigationBar: FC = () => {
    const {store} = useContext(Context);
    const {productStore} = useContext(Context);


    let butLineProduct = productStore.isOpenProductTable  == true ? "#fafafa" : null;
    
    return(
        <div className='nav-bar-con'> 
            <nav className='nav-bar'>
                <div className='nav-bar-but-con'>
                    <button 
                        id = "productButton" 
                        onClick={() => productStore.openProductTable()}
                        style={{"color": butLineProduct} as React.CSSProperties}>
                        товары
                    </button>
                    <div className='nav-button-line'
                        style={{"background": butLineProduct} as React.CSSProperties}></div>
                    </div>
                    
                <div className='nav-bar-but-con'>
                    <button 
                        id = "test">test</button>
                        <div className='nav-button-line'></div>
                </div>    
            </nav>
        </div>
    )
}

export default observer(NavigationBar);