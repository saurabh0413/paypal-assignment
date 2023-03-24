const { default: mongoose } = require("mongoose");

const sprintSchema = mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, ref: "login"},
    sprintName:{type:String, required:true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const sprintModel = mongoose.model("sprint", sprintSchema);

module.exports = { sprintModel };
