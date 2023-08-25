import {FC, useContext, useState} from 'react';
import {Context, productStore} from '../index';
import {observer} from 'mobx-react-lite';
import ProductTable from './ProductTable/ProductTable';
import ProducTableContainer from './ProductTable/ProducTableContainer';
import AddProductContainer from './AddProduct/AddProductContainer';

const ContentContainer: FC = () => {

    const {store} = useContext(Context); 
    const {productStore} = useContext(Context);

    if(productStore.isOpenProductTable){
        return(<ProducTableContainer/>)
    } 

    if(productStore.isOpenAddProductWindow){
        return(<AddProductContainer/>)
    }

    return (
        <div>no flags</div>
    )
}

export default observer(ContentContainer);