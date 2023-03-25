const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { authRoute } = require("./routes/auth.routes");
const { authentication } = require("./middleware/authentication");
const { sprintRoute } = require("./routes/sprints.routes");
const { tasksRoute } = require("./routes/tasks.routes");
const { updateTaskController } = require("./controllers/tasks.controller");
const { sprintController } = require("./controllers/sprints.controller");

const app = express();
app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/", authRoute);
app.use(authentication);
app.use("/sprints", sprintRoute);
app.patch("/tasks/:id", updateTaskController);
app.use("/tasks", tasksRoute);
app.post("/dashboard", sprintController);
app.listen(8585, async () => {
  try {
    await connection;
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
  console.log("server started on port 8585");
});
