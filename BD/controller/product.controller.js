const Product = require("../models/Product.model");

function createProduct(req, res) {
  try {
    const { productName, productPrice, productImage, productCategory } =
      req.body;

    if (
      !productName ||
      !productPrice ||
      !productImage ||
      !Array.isArray(productCategory)
    ) {
      return res.status(400).send("Product details required");
    }

    const newProduct = new Product({
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
      productCategory: productCategory,
    });

    newProduct.save();

    res.status(200).json({ message: "product added successfully" });
  } catch (error) {
    console.error(error);
  }
}

async function getProducts(req, res) {
  const allProduct = await Product.find();
  res.status(200).json({ message: "product fetched successfully", allProduct });
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).send("Product Not Found");
    }
    res
      .status(200)
      .json({ mesaage: "Product fetched successfully", findProduct });
  } catch (error) {
    console.error(error);
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { productName, productPrice } = req.body;

    if (!productName || (!productPrice && !isNaN(productPrice))) {
      return res.status(400).send("Product details required");
    }
    const findProductAndUpdate = await Product.findByIdAndUpdate(
      id,
      { productName, productPrice },
      { new: true },
    );

    if (!findProductAndUpdate) {
      return res.status(404).send("Product Not Found");
    }

    res.status(200).json({ message: "product updated succesfully" });
  } catch (error) {
    console.error(error)
  }
}



module.exports = { createProduct, getProducts, getProduct, updateProduct};
