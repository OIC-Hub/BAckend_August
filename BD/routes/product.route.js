const express = require("express");
const route = express.Router();
const {createProduct, getProducts} = require("../controller/product.controller")

route.post("/create", createProduct)
route.get("/getproduct", getProducts)



module.exports = route