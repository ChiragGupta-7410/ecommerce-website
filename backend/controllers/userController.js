const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncErrorHandler = require("../middleware/asyncError.js");
const sendToken = require("../utils/jwtTokenCreation.js");

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.userSignUp = asyncErrorHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  sendToken(user, 201, res);
});

exports.userLogIn = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email Field can not be empty", 400));
  } else if (!password) {
    return next(new ErrorHandler("Password Field can not be empty", 400));
  }

  const user = await User.findOne({ email }).select("+password"); //+password because we have made select false for it in user model

  if (user) {
    const passwordMatched = user.comparePassword(password);

    if (!passwordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
  } else {
    return next(new ErrorHandler("User Not Found", 401));
  }
});
