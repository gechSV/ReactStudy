import React, {FC, useContext, useState, useRef, useEffect} from 'react';
import {Context, productStore} from '../../index';
import {observer} from 'mobx-react-lite';
import { ReactComponent as UploadIcon } from "../../assets/iconsSVG/upload.svg";
import { ReactComponent as CloseIcon} from '../../assets/iconsSVG/close.svg';

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
        <div style={{width: '500px'} as React.CSSProperties}>
            <div
                className="drop-zone"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                >
                    <UploadIcon className='drop-zone-img'/>
            </div>
            <div className='image-slider-con'>
                {productStore.imagesRef.map((val, key) => {
                    return(
                        val ? 
                        <div className='img-con'>
                            <button className='del-button'>
                                <CloseIcon className='del-img'
                                    onClick={() => productStore.delFileByIndex(key)}/> 
                            </button>
                            <img 
                            ref={imageRef} 
                            alt="Preview" 
                            src={val.toString()}></img>
                        </div> : null
                    )
                    })
                }
            </div>
        </div>
    )
}

export default observer(ContentContainer);

