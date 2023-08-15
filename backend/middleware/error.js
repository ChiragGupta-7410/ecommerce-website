const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // JWT Error Handling
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token has Expired, Try Again`;
    err = new ErrorHandler(message, 400);
  } else if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate Key Error Handling
  else if (err.code === 11000) {
    let keyValueKey = Object.keys(err.keyValue);
    keyValueKey = keyValueKey.map((str) => {
      return str[0].toUpperCase() + str.slice(1);
    });
    const message = `Entered ${keyValueKey}: ${Object.values(
      err.keyValue
    )} Already Exists`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong Product ID Error Handling
  else if (err.name === "CastError") {
    const message = `Resource not found, Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
