const express = require("express");
const route = express.Router();
const {createProduct, getProducts, getProduct, updateProduct} = require("../controller/product.controller")

route.post("/create", createProduct)
route.get("/products", getProducts)
route.get("/products/:id", getProduct)
route.put("/products/:id", updateProduct);





module.exports = route