const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/productController.js");
const {
  authenticatedUser,
  administrativePrivileges,
} = require("../middleware/userAuthentication.js");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(authenticatedUser, administrativePrivileges(), createProduct);
router
  .route("/products/:id")
  .get(getSingleProduct)
  .put(authenticatedUser, administrativePrivileges(), updateProduct)
  .delete(authenticatedUser, administrativePrivileges(), removeProduct);

module.exports = router;
