import {FC} from 'react';
import { observer } from 'mobx-react-lite';

const AddProductWindow: FC = () => {
    return(
        <div className='AddProduct'>
            AddProductWindow
            <div className='inputCon'>
                <div>
                    <label>Название</label>
                    <input 
                        type="text"
                        placeholder='name' 
                    />
                </div>
                <div>
                    <label>Описание</label>
                    <textarea 
                        placeholder='description' 
                        aria-multiline
                    />
                </div>
                <div>
                    <label>Цена</label>
                    <input 
                        type="text"
                        placeholder='price' 
                    />
                    </div>
            </div>

        </div>
    )
}

export default observer(AddProductWindow);