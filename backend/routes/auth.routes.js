const express = require("express");
const { loginController } = require("../controllers/login.controller");
const {
  signupController,
  usersController,
} = require("../controllers/signup.controller");

const authRoute = express.Router();
authRoute.get("/", usersController);
authRoute.post("/", signupController);
authRoute.post("/login", loginController);
module.exports = { authRoute };
