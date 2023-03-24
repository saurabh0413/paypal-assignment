const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    sprintId: { type: mongoose.Schema.Types.ObjectId, ref: "sprint" },
    task_name: { type: String, required: true },
    status: { type: String, default: "todo" },
    assigned: { type: mongoose.Schema.Types.ObjectId, ref: "login" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const taskModel = mongoose.model("tasks", taskSchema);

module.exports = { taskModel };
