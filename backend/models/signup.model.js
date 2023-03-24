const { default: mongoose } = require("mongoose");

const singupSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const signupModel = mongoose.model("singup", singupSchema);

module.exports = { signupModel };
