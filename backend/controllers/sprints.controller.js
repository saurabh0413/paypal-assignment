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

module.exports = { sprintController };
