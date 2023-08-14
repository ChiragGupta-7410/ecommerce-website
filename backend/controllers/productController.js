const Product = require("../models/productModel.js");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (product) {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
};

exports.removeProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product Removed Successfully",
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Product not Found",
    });
  }
};
