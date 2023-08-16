const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncErrorHandler = require("./asyncError.js");

exports.authenticatedUser = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Resource Requires Login", 401));
  }

  const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decryptedToken.id);
  next();
});

exports.administrativePrivileges = () => {
  return (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(new ErrorHandler("Administrative Privileges Required", 403));
    }

    next();
  };
};
