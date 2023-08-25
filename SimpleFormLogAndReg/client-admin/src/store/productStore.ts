import {makeAutoObservable} from 'mobx';
import ProductService from "../services/ProductService";
import { IProduct } from "../models/response/IProduct";

export default class ProductStore{
    isOpenProductTable = false;
    isOpenAddProductWindow = false;
    products = {} as IProduct[];
    imagesRef = [] as (string | ArrayBuffer | null)[];
    // imagesRef = Array<string | ArrayBuffer | null>;

    constructor(){ 
        makeAutoObservable(this);
    }

    setOpenProductTable(bool: boolean){
        this.isOpenProductTable = bool;
    };

    setProducts(products: IProduct[]){
        this.products = products;
    }

    setOpenAddProductWindow(bool: boolean){
        this.isOpenAddProductWindow = bool;
    }

    async openProductTable(){
        try {
            const response = await ProductService.getAllProducts();
            this.setProducts(response.data.products);
            this.setOpenProductTable(!this.isOpenProductTable);
        } catch (e) {
            if (e instanceof Error){
                console.log(e.message);
            }
            else{
                console.log('Unexcepted error', e);
            }
        }
    }

    async openAddProductWindow(){
        try {
            this.setOpenAddProductWindow(!this.isOpenAddProductWindow);
        } catch (e) {
            if (e instanceof Error){
                console.log(e.message);
            }
            else{
                console.log('Unexcepted error', e);
            }
        }
    }

    setImages(data: string | ArrayBuffer | null){
        this.imagesRef.push(data);
    }

    delFileByIndex(index: number){
        this.imagesRef.splice(index, 1);
    }  
}