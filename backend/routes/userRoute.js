const express = require("express");
const {
  userSignUp,
  getAllUsers,
  userLogIn,
} = require("../controllers/userController");

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/users/signup").post(userSignUp);
router.route("/users/login").post(userLogIn);

module.exports = router;
