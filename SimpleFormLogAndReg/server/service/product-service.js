const ApiError = require("../exceptoins/api-error");
const ProductModel = require('../models/product-models');

class ProductService {
    async getAllProducts(){
        const products = await ProductModel.find();
        return products;
    }

    async addProduct(product){
        const newProduct = await ProductModel.create(product)
        return newProduct;
    }

    // const user = await UserModel.create(
        // {email, password: hashPassword, activationLink, roles: [userRole.value]});
}

module.exports = new ProductService();
