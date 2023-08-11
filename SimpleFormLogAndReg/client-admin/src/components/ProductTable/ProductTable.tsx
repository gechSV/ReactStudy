import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import MenuProductTable from './MenuProductTable';
import AddProductWindow from './AddProductWindow';

const ProductTable: FC = () => {
    const {store} = useContext(Context);
    return(
        <div>
            <MenuProductTable/>
            <div className='TableCon'>
            {store.isOpenAddProductWindow ? <AddProductWindow/> : null}
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Количество</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.products.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.name}</td>
                                    <td>{val.description}</td>
                                    <td>{val.quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default observer(ProductTable);