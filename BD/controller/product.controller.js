const Product = require('../models/Product.model');

function createProduct(req, res) {
   try {
     const {productName, productPrice, productImage, productCategory} = req.body

    if(!productName || !productPrice || !productImage ||  !Array.isArray(productCategory)){
        return res.status(400).send("Product details required")
    }

    const newProduct = new Product({
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
        productCategory: productCategory
    })

    newProduct.save();

    res.status(200).json({message: "product added successfully"})
   } catch (error) {
    console.error(error)
   }
}


async function getProducts(req, res){
    const allProduct = await Product.find();
    res.status(200).json({message: "product fetched successfully", allProduct})
}


module.exports = {createProduct, getProducts};