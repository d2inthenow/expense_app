const express = require("express"); // thêm dòng này
const mongoose = require("mongoose");

const {
  loginControllers,
  registerControllers,
  setAvatarController,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

router.route("/setAvatar/:id").post(setAvatarController);

module.exports = router;
