import {FC, useContext, useState} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import ToolBarProductTable from './ToolBarProductTable';


const ProductTable: FC = () => {
    const {store} = useContext(Context);

    return(
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
    )
}

export default observer(ProductTable);

