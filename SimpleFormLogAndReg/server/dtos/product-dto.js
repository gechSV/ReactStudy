module.exports = class ProductDto{
    name;
    description;
    // type;
    price;
    photo;
    quantity;

    constructor(model){
        this.name = model.name;
        this.description = model.description;
        // this.type = model.type;
        this.price = model.price;
        this.photo = model.photo;
        this.quantity = model.quantity;  
    }
}