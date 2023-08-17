const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

const addressSchema = new mongoose.Schema({
  mobileNo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

addressSchema.path("mobileNo").validate(function validateNo() {
  return this.mobileNo > 999999999 && this.mobileNo < 10000000000;
});

const paymentSchema = new mongoose.Schema({
  id: { type: String },
  status: { type: String },
  update_time: { type: String },
  email_address: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartItems: [cartSchema],
    shippingAddress: addressSchema,
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    paymentDetails: paymentSchema,
    tax: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalCost: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
