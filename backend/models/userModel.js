const mongoose = require("mongoose");
const validator = require("validator");
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name Not Added"],
    },
    email: {
      type: String,
      required: [true, "User Email Not Added"],
      unique: true,
      validate: [validator.isEmail, "Invalid Email Entered"],
    },
    password: {
      type: String,
      required: [true, "Password Not Added"],
      minLength: [8, "Password should contain at least 8 letters"],
      select: false,
    },
    avatar: {
      id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptJs.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

userSchema.methods.comparePassword = async function (passwordEntered) {
  return await bcryptJs.compare(passwordEntered, this.password);
};

userSchema.methods.resetPasswordToken = function () {
  const resetToken = crypto.randomBytes(25).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetToken = resetTokenHash;
  this.passwordResetExpire = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
