const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncErrorHandler = require("../middleware/asyncError.js");

exports.getAllProducts = asyncErrorHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  } else {
    return next(new ErrorHandler("Product not Found", 404));
  }
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
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
    return next(new ErrorHandler("Product not Found", 404));
  }
});

exports.removeProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product Removed Successfully",
    });
  } else {
    return next(new ErrorHandler("Product not Found", 404));
  }
});
