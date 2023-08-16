const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name Not Added"],
    },
    images: [
      {
        id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: [true, "Product Description Not Added"],
    },
    category: {
      type: String,
      required: [true, "Product Category Not Added"],
    },
    price: {
      type: Number,
      required: [true, "Product Price Not Added"],
      default: 0,
      maxLength: [10, "Price cannot exceed 10 characters"],
    },
    Stock: {
      type: Number,
      required: [true, "Product Stock Not Added"],
      default: 0,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
