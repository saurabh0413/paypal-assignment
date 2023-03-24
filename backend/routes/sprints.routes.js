const express = require("express");
const { sprintController } = require("../controllers/sprints.controller");
const sprintRoute = express.Router();
sprintRoute.get("/", sprintController);
module.exports = { sprintRoute };
