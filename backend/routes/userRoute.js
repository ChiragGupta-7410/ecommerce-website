const express = require("express");
const {
  userSignUp,
  getAllUsers,
  userLogIn,
  userLogOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/users/signup").post(userSignUp);
router.route("/users/login").post(userLogIn);
router.route("/users/logout").get(userLogOut);
router.route("/users/password/forgot").post(forgotPassword);
router.route("/users/password/reset/:token").put(resetPassword);

module.exports = router;
