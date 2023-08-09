const ProductDto = require("../dtos/product-dto");
const ApiError = require("../exceptoins/api-error");
const ProductService = require("../service/product-service");

class ProductController{
    async getAllProduct(req, res, next){
        try {
            const products = await ProductService.getAllProducts();
            return res.json({"products": products});
        } catch (e) {
            next(e);
        }
    }

    async addProduct(req, res, next){
        try {
            const newProductData = new ProductDto(req.body);
            const newProduct = ProductService.addProduct(newProductData);
            return res.json({status: "ok"});
        } catch (e) {
            next(e);
        }
    }

    
}

module.exports = new ProductController();