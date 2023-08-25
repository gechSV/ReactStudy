import {FC, useContext, useState} from 'react';
import {Context, productStore} from '../../index';
import {observer} from 'mobx-react-lite';
import ToolBarProductTable from './ToolBarProductTable';


const ProductTable: FC = () => {
    const {store} = useContext(Context);

    return(
        <div className='table-con'>
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Количество</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {productStore.products.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td>{val.description}</td>
                                <td>{val.quantity}</td>
                                <td>{val.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default observer(ProductTable);

