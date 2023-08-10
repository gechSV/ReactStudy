import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ProductTable: FC = () => {
    const {store} = useContext(Context);

    return(
        <div className='MenuProductTable'>
            <button onClick={() => store.openAddProductWindow()}>Добавить товар</button>
        </div>
    )
}

export default observer(ProductTable);