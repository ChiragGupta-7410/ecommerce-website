const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const QueryHandler = require("../utils/queryHandler.js");
const RequestBodyHandler = require("../utils/reqBodyHandler.js");
const asyncErrorHandler = require("../middleware/asyncError.js");

exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const defaultProductPerPage = 8;
  const productCount = await Product.countDocuments();

  const queryHandler = new QueryHandler(Product.find(), req.query)
    .search()
    .filter()
    .pagination(defaultProductPerPage);
  const products = await queryHandler.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
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

exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
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

// Product Reviews

exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const reviews = product.reviews;

    res.status(200).json({
      success: true,
      reviews,
    });
  } else {
    return next(new ErrorHandler("Product Not Found"), 404);
  }
});

exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
  const requestBodyHandler = new RequestBodyHandler(req.body).reviewFilter();

  const reviewData = {
    name: req.user.name,
    rating: Number(requestBodyHandler.reqBodyStr.rating),
    comment: requestBodyHandler.reqBodyStr.comment || "",
    user: req.user._id,
  };

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return next();
    }
    product.reviews.push(reviewData);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce(
        (accumulator, currentValue) => currentValue.rating + accumulator,
        0
      ) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Review Added",
    });
  } else {
    return next(new ErrorHandler("Product Not Found", 404));
  }
});

exports.updateProductReview = asyncErrorHandler(async (req, res, next) => {
  const requestBodyHandler = new RequestBodyHandler(req.body).reviewFilter();

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (!alreadyReviewed) {
      return next(new ErrorHandler("Review Not Found", 404));
    }
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.rating = requestBodyHandler.reqBodyStr.rating;
        r.comment = requestBodyHandler.reqBodyStr.comment || r.comment || "";
      }
    });

    product.rating =
      product.reviews.reduce(
        (accumulator, currentValue) => currentValue.rating + accumulator,
        0
      ) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Review Updated",
    });
  } else {
    return next(new ErrorHandler("Product Not Found", 404));
  }
});

exports.deleteProductReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (!alreadyReviewed) {
      return next(new ErrorHandler("Review Not Found", 404));
    }

    const reviews = product.reviews.filter(
      (r) => r.user.toString() !== req.user._id.toString()
    );

    let rating = 0;
    if (reviews.length !== 0) {
      rating =
        reviews.reduce(
          (accumulator, currentValue) => currentValue.rating + accumulator,
          0
        ) / reviews.length;
    }

    const numReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.params.id,
      { reviews, rating, numReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      status: true,
      message: "Review Deleted Successfully",
    });
  } else {
    return next(new ErrorHandler("Product Not Found", 404));
  }
});

// For Order Controller Use

exports.updateInventory = {
  async updateStock(productId, quantity) {
    const product = await Product.findById(productId);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
  },
};
