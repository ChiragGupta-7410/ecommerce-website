const express = require("express");
const {
  createOrder,
  getUserOrders,
  getSingleOrder,
  getAllOrders,
  adminDeliverOrder,
  adminDeleteOrder,
} = require("../controllers/orderController.js");
const {
  authenticatedUser,
  administrativePrivileges,
} = require("../middleware/userAuthentication.js");

const router = express.Router();

router.route("/orders/new").post(authenticatedUser, createOrder);
router.route("/orders").get(authenticatedUser, getUserOrders);
router
  .route("/admin/orders")
  .get(authenticatedUser, administrativePrivileges(), getAllOrders);
router
  .route("/admin/orders/:id")
  .get(authenticatedUser, administrativePrivileges(), getSingleOrder)
  .put(authenticatedUser, administrativePrivileges(), adminDeliverOrder)
  .delete(authenticatedUser, administrativePrivileges(), adminDeleteOrder);

module.exports = router;
