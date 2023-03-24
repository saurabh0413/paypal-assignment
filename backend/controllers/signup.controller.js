const { signupModel } = require("../models/signup.model");

const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);
const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send("something went wrong, please try again later");
    } else {
      const user = new signupModel({
        name: name,
        email: email,
        password: hash,
      });
      await user.save();
      res.send(user);
    }
  });
};

const usersController = async (req, res) => {
  const users = await signupModel.find();
  res.send(users);
};
module.exports = { signupController, usersController };
