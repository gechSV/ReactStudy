import {FC, useContext, useState} from 'react';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';
import ProductTable from './ProductTable/ProductTable';
import ProducTableContainer from './ProductTable/ProducTableContainer';
import AddProductContainer from './AddProduct/AddProductContainer';

const ContentContainer: FC = () => {

    const {store} = useContext(Context); 

    if(store.isOpenProductTable){
        return(<ProducTableContainer/>)
    } 

    if(store.isOpenAddProductWindow){
        return(<AddProductContainer/>)
    }

    return (
        <div>no flags</div>
    )
}

export default observer(ContentContainer);