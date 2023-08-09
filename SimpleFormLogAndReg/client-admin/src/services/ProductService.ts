import $api from "../http";
import { AxiosResponse } from "axios";
import { ProductResponse } from "../models/response/ProductResponse";

export default class ProductService{
    static async getAllProducts(): Promise<AxiosResponse<ProductResponse[]>>{
        return $api.get<ProductResponse[]>('/getAllProducts');
    }
}