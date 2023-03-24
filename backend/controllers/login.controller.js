const loginController = async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  const result1 = await signupModel.findOne({ email });

  const hashed_pass = result1.password;

  bcrypt.compare(password, hashed_pass, function (err, result) {
    if (result) {
      const token = jwt.sign({ userId: result1._id }, "abcd1234");
      res.send({ msg: "login success", token: token });
    } else {
      res.send("Login Failed");
    }
  });
};

module.exports = { loginController };
