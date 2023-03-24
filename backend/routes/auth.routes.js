const express = require("express");
const { signupController } = require("../controllers/signup.controller");

const authRoute = express.Router();

authRoute.post("/", signupController);
module.exports = { authRoute };
