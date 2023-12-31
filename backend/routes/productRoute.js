const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  removeProduct,
  getProductReviews,
  createProductReview,
  updateProductReview,
  deleteProductReview,
} = require("../controllers/productController.js");
const {
  authenticatedUser,
  administrativePrivileges,
} = require("../middleware/userAuthentication.js");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getSingleProduct);
router
  .route("/admin/products/new")
  .post(authenticatedUser, administrativePrivileges(), createProduct);
router
  .route("/admin/products/:id")
  .put(authenticatedUser, administrativePrivileges(), updateProduct)
  .delete(authenticatedUser, administrativePrivileges(), removeProduct);
router
  .route("/products/:id/review")
  .put(authenticatedUser, createProductReview, updateProductReview)
  .delete(authenticatedUser, deleteProductReview);

router.route("/products/:id/reviews").get(authenticatedUser, getProductReviews);

module.exports = router;
