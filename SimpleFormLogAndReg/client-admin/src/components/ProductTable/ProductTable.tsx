import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import MenuProductTable from './MenuProductTable';

const ProductTable: FC = () => {


    return(
        <div>
            <MenuProductTable/>
            ProductTable

        </div>
    )
}

export default observer(ProductTable);