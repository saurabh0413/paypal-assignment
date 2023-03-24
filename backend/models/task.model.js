const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    sprintId: { type: mongoose.Schema.Types.ObjectId, ref: "sprint" },
    task_name: { type: String, required: true },
    task_type: { type: String },
    status: { type: String, default: "No status" },
    assigned: { type: mongoose.Schema.Types.ObjectId, ref: "login" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = { taskModel };
