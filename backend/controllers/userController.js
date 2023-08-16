const crypto = require("crypto");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncErrorHandler = require("../middleware/asyncError.js");
const sendToken = require("../utils/jwtTokenCreation.js");
const sendEmail = require("../utils/sendEmail.js");
const RequestBodyHandler = require("../utils/reqBodyHandler.js");

// User Routes

exports.userDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateDetails = asyncErrorHandler(async (req, res, next) => {
  if ("avatar" in req.body) {
    const avatar = req.body.avatar;
    delete req.body.avatar;
    req.body.avatar = { id: "avatar_id_2", url: "avatar_url_2" };
  }

  const requestBodyHandler = new RequestBodyHandler(req.body).filter();

  const user = await User.findByIdAndUpdate(
    req.user.id,
    requestBodyHandler.reqBodyStr,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password"); // because we select: false in the user model for password

  const passwordMatched = await user.comparePassword(req.body.currentPassword);

  if (!passwordMatched) {
    return next(new ErrorHandler("Incorrect Current Password", 400));
  } else if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords Does Not Match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// User Authentication and Password Handling

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

// Admin Routes

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const userCount = await User.countDocuments();

  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
    userCount,
  });
});

exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(new ErrorHandler("User Not Found", 404));
  }
});

exports.adminUpdateUserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    let isAdmin = undefined;

    if ("isAdmin" in req.body) {
      isAdmin = req.body.isAdmin;
    }

    if ("avatar" in req.body) {
      const avatar = req.body.avatar;
      delete req.body.avatar;
      req.body.avatar = { id: "avatar_id_2", url: "avatar_url_2" };
    }

    const requestBodyHandler = new RequestBodyHandler(req.body).filter();

    if (isAdmin !== undefined) {
      requestBodyHandler.reqBodyStr.isAdmin = isAdmin;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      requestBodyHandler.reqBodyStr,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(new ErrorHandler("User Not Found", 404));
  }
});

exports.adminDeleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } else {
    return next(new ErrorHandler("User Not Found", 404));
  }
});
