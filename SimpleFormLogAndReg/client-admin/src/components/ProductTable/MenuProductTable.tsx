import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ProductTable: FC = () => {


    return(
        <div className='MenuProductTable'>
            <button>Добавить товар</button>
        </div>
    )
}

export default observer(ProductTable);