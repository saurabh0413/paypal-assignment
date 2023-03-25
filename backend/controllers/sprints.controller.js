const { sprintModel } = require("../models/sprint.model");

const sprintController = async (req, res) => {
  const { userId, sprintName } = req.body;

  const sprint = new sprintModel({
    userId,
    sprintName,
  });
  await sprint.save();
  res.send(sprint);
};

const getSprintData = async (req, res) => {
  const data = await sprintModel.find();
  res.send(data);
};
module.exports = { sprintController, getSprintData };
