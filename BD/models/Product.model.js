const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        require: true
    },
    productImage: {
        type: String,
         require: true
    },
    productCategory:[
        { type: String }
    ]
})

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product