const express = require("express");
const {
  tasksController,
  getTasksController,
  updateTaskController,
} = require("../controllers/tasks.controller");
const tasksRoute = express.Router();


tasksRoute.get("/", getTasksController);
tasksRoute.post("/create", tasksController);

module.exports = { tasksRoute };
