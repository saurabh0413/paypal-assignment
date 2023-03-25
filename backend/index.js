const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { authRoute } = require("./routes/auth.routes");
const { authentication } = require("./middleware/authentication");
const { sprintRoute } = require("./routes/sprints.routes");
const { tasksRoute } = require("./routes/tasks.routes");
const { updateTaskController } = require("./controllers/tasks.controller");

const app = express();
// app.use(cors());
// app.use((req, res, next) => {
//   "Access-Control-Allow-Origin: *",
//     "Access-Control-Allow-Methods: POST, PUT, PATCH, GET, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers: *";

//   next();
// });
app.options("*", cors());
app.use(express.json());

app.use("/", authRoute);
app.use(authentication);
app.use("/sprints", sprintRoute);
app.patch("/tasks/:id", updateTaskController);
app.use("/tasks", tasksRoute);
app.listen(8585, async () => {
  try {
    await connection;
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
  console.log("server started on port 8585");
});
