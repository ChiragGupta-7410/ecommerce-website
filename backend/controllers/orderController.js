const Order = require("../models/orderModel.js");
const { updateInventory } = require("./productController.js");
const ErrorHandler = require("../utils/errorHandler.js");
const RequestBodyHandler = require("../utils/reqBodyHandler.js");
const asyncErrorHandler = require("../middleware/asyncError.js");

exports.createOrder = asyncErrorHandler(async (req, res, next) => {
  const reqBodyHandler = new RequestBodyHandler(req.body).orderFilter();

  reqBodyHandler.reqBodyStr.user = req.user._id;
  reqBodyHandler.reqBodyStr.isPaid = true;
  reqBodyHandler.reqBodyStr.paymentDate = Date.now();

  const order = await Order.create(reqBodyHandler.reqBodyStr);

  res.status(201).json({
    success: true,
    order,
  });
});

exports.getUserOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Administrative Privileges

exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find();

  const totalRevenue = orders.reduce(
    (accumulator, currentValue) => currentValue.totalCost + accumulator,
    0
  );

  res.status(200).json({
    success: true,
    totalRevenue,
    orders,
  });
});

exports.getSingleOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json({
      success: true,
      order,
    });
  } else {
    return next(new ErrorHandler("Order Not Found", 404));
  }
});

exports.adminDeliverOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.isDelivered) {
      return next(new ErrorHandler("Order Already Delivered", 400));
    }

    if (req.body.isDelivered) {
      order.cartItems.forEach(async (o) => {
        await updateInventory.updateStock(o.product, o.quantity);
      });
      order.isDelivered = req.body.isDelivered;
      order.deliveryDate = Date.now();

      await order.save({ validateBeforeSave: false });
    }
    res.status(200).json({
      success: true,
      message: "Order Delivered Successfully",
    });
  } else {
    return next(new ErrorHandler("Order Not Found", 404));
  }
});

exports.adminDeleteOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } else {
    return next(new ErrorHandler("Order Not Found", 404));
  }
});
