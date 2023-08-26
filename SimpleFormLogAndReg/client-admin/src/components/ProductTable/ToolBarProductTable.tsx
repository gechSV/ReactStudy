import React, {FC, useContext, useState, useEffect} from 'react';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import DragAndDropInput from './DragAndDropInput';


const ToolBarProductTable: FC = () => {
    const {store} = useContext(Context);
    const {productStore} = useContext(Context);
    let windowHeight = productStore.isOpenAddProductWindow ? 
        {display: 'flex'} as React.CSSProperties: {display: 'none'} as React.CSSProperties;

    useEffect(() => {
        console.log(productStore.imagesRef.length)
    }, [productStore.imagesRef])

    return(
        <div id="tool-bar-for-table-con"
            className='tool-bar-for-table-con'>
            <div className='tool-bar-head'>
                <div className='button-con_1'>
                    <button className='button_1'
                    onClick={() => productStore.openAddProductWindow()}>Добавить новый</button>
                    <div className='button-line_1'
                        style={{"background": "#fafafa"} as React.CSSProperties}> 
                    </div>
                </div>
            </div>
            <div className='tool-bar'
                style={windowHeight}>
                    <div style={{width: '100%'} as React.CSSProperties}>
                        <div className='input-box'>
                            <label 
                                className='label-white'
                                htmlFor="input-name">Название:</label>
                            <input className='standart-input' id='input-name' type="text" placeholder='Название'/>
                        </div>

                        <div className='input-box'>
                            <label 
                                className='label-white'
                                htmlFor="input-discription" >Описание:</label>
                            <textarea className='standart-textarea' id='input-discription' placeholder='Описание'/>
                        </div>

                        <div className='input-box'>
                            <label 
                                className='label-white'
                                htmlFor="input-count">Количество:</label>
                            <input className='standart-input' id='input-count' type="text" placeholder=''/>
                        </div>

                        <div className='input-box'>
                            <label 
                                className='label-white'
                                htmlFor="input-price">Цена:</label>
                            <input className='standart-input' id='input-price' type="text" placeholder='Цена'/>
                        </div>
                    </div>
                    <DragAndDropInput/>
            </div>
        </div>
    )
}

export default observer(ToolBarProductTable);