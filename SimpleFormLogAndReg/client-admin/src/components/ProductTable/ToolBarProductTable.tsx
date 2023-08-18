import {FC, useContext, useState} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';


const ToolBarProductTable: FC = () => {
    const {store} = useContext(Context);

    return(
        <div className='tool-bar-for-table-con'>
            <div className='tool-bar-head'></div>
            <div className='tool-bar'>
                <div className='button-con_1'>
                    <div className='button-line_1'
                        style={{"background": "#fafafa"} as React.CSSProperties}> 
                    </div>
                    <button className='button_1'>Добавить новый</button>
                </div>
            </div>
        </div>
    )
}

export default observer(ToolBarProductTable);