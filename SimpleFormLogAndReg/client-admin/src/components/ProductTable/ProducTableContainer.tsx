import {FC, useContext, useState} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import ProductTable from './../ProductTable/ProductTable';
import ToolBarProductTable from './ToolBarProductTable';

const ProductTableContainer: FC = () => {
    const {store} = useContext(Context); 

    return (
        <div className='product-table-con-page'>
            <ProductTable/>
            <ToolBarProductTable/>
        </div>
    )
}

export default observer(ProductTableContainer);