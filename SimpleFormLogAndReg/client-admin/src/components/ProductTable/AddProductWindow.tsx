import {FC} from 'react';
import { observer } from 'mobx-react-lite';

const AddProductWindow: FC = () => {
    return(
        <div className='AddProduct'>
            AddProductWindow
            <div className='inputCon'>
                <input 
                    type="text"
                    placeholder='name' 
                />
                <input 
                    type="text"
                    placeholder='description' 
                />
            </div>

        </div>
    )
}

export default observer(AddProductWindow);