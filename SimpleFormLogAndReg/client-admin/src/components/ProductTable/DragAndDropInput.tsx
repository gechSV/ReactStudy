import {FC, useContext, useState, useRef, useEffect} from 'react';
import {Context, productStore} from '../../index';
import {observer} from 'mobx-react-lite';
// import { ReactComponent as img} from '../../assets/iconsSVG/drug-and-drop.svg';
import Logo from 'assets/iconsSVG/druganddrop.svg';

const ContentContainer: FC = () => {
    const [isOver, setIsOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);
    let i = 0;
    const {productStore} = useContext(Context);

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    
        setIsLoading(true);
        
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);

        droppedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                productStore.setImages(reader.result);
            }

            reader.onerror = () => {
                console.error('There was an issue reading the file.');
            };

            reader.readAsDataURL(file);
        })
    }
    

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        setIsOver(true);
    }
    
    function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        setIsOver(false);
    }

  

    return (
        <div>
            <div
                className="drop-zone"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                >
            </div>
            <div>
                {productStore.imagesRef.map((val, key) => {
                    return(
                        val ? 
                            <img 
                            onClick={() => productStore.delFileByIndex(key)}
                            ref={imageRef} 
                            alt="Preview" 
                            src={val.toString()}></img>: null
                    )
                    })
                }
            </div>
        </div>
    )
}

export default observer(ContentContainer);

