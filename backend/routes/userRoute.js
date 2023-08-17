const express = require("express");
const {
  userDetails,
  updateDetails,
  updatePassword,
  userSignUp,
  userLogIn,
  userLogOut,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getSingleUser,
  adminUpdateUserDetails,
  adminDeleteUser,
} = require("../controllers/userController");
const {
  authenticatedUser,
  administrativePrivileges,
} = require("../middleware/userAuthentication.js");

const router = express.Router();

router.route("/users/profile").get(authenticatedUser, userDetails);
router
  .route("/users/profile/update/details")
  .put(authenticatedUser, updateDetails);
router
  .route("/users/profile/update/password")
  .put(authenticatedUser, updatePassword);
router.route("/users/signup").post(userSignUp);
router.route("/users/login").post(userLogIn);
router.route("/users/logout").get(userLogOut);
router.route("/users/password/forgot").post(forgotPassword);
router.route("/users/password/reset/:token").put(resetPassword);
router
  .route("/admin/users")
  .get(authenticatedUser, administrativePrivileges(), getAllUsers);
router
  .route("/admin/users/:id")
  .get(authenticatedUser, administrativePrivileges(), getSingleUser)
  .put(authenticatedUser, administrativePrivileges(), adminUpdateUserDetails)
  .delete(authenticatedUser, administrativePrivileges(), adminDeleteUser);

module.exports = router;
