const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter Product Name"],
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
      required: [true, "Enter Product Description"],
    },
    price: {
      type: Number,
      required: [true, "Enter Product Price"],
      default: 0,
      maxLength: [10, "Price cannot exceed 10 characters"],
    },
    Stock: {
      type: Number,
      required: [true, "Enter Product Stock"],
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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
