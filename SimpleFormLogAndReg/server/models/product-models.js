const {Schema, model} = require('mongoose');

const ProductModel = new Schema({
    name: {type: String, required: true}, 
    description: {type: String, required: false},
    // type: {type: String, ref: 'ProductType'},
    price: {type: Number, required: false}, 
    photo: [{type: Buffer, required: false}],  
    quantity: {type: Number, required: false},

    // TODO: добавить категории 
})

module.exports = model('Product', ProductModel)