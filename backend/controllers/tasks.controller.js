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
  const Tasks = await taskModel.find().populate("assigned").lean();
  res.send(Tasks);
};
const updateTaskController = async (req, res) => {
  const taskId = req.params.id;
  const { task_name, status, assigned } = req.body;
 
  const taskupdate = await taskModel.findByIdAndUpdate(
    { _id: taskId },
    { task_name: task_name, status: status, assigned: assigned }
  );
  await taskupdate.save();
  res.send(taskupdate);
};
module.exports = { tasksController, getTasksController, updateTaskController };
