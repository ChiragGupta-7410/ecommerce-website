const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Cart",
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    paymentDetails: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
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

module.exports - mongoose.model("Order", orderSchema);
