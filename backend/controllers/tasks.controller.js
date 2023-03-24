const { taskModel } = require("../models/task.model");

const tasksController = async (req, res) => {
  const { sprintId, task_name, status, assigned } = req.body;
  const Task = new taskModel({
    sprintId,
    task_name,
    status,
    assigned,
  });
  await Task.save();
  res.send(Task);
};

const getTasksController = async (req, res) => {
  const Tasks = await taskModel.find();
  res.send(Tasks);
};

module.exports = { tasksController,getTasksController };
