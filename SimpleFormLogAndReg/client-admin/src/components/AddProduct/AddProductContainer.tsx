import {FC, useContext, useState} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import ProductTable from './../ProductTable/ProductTable';

const AddProductContainer: FC = () => {
    const {store} = useContext(Context); 

    return (
        <div className='add-product-con'>

        </div>
    )
}

export default observer(AddProductContainer);