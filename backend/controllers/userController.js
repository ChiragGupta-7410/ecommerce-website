const crypto = require("crypto");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncErrorHandler = require("../middleware/asyncError.js");
const sendToken = require("../utils/jwtTokenCreation.js");
const sendEmail = require("../utils/sendEmail.js");

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
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
  } else {
    return next(new ErrorHandler("User Not Found", 404));
  }
});

exports.userLogOut = asyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully",
  });
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const resetToken = user.resetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const passwordResetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/password/reset/${resetToken}`;

    const emailBody = `You're receiving this e-mail because you or someone else has requested a password reset for your user account.\n\nClick the link below to reset your password:\n${passwordResetUrl}\n\nIf you did not request a password reset you can safely ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "[Laptop Shop] Password Reset E-mail",
        emailBody,
      });

      res.status(200).json({
        success: true,
        message: "Email Send Successfully",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  } else {
    return next(new ErrorHandler("User Not Found", 404));
  }
});

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (user) {
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords Does Not Match", 400));
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  } else {
    return next(new ErrorHandler("Bad Token", 498));
  }
});
