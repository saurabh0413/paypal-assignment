const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { authRoute } = require("./routes/auth.routes");
const { authentication } = require("./middleware/authentication");
const { sprintRoute } = require("./routes/sprints.routes");
const { tasksRoute } = require("./routes/tasks.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", authRoute);
app.use(authentication);
app.use("/sprints", sprintRoute);
app.use("/tasks", tasksRoute);
app.listen(8585, async () => {
  try {
    await connection;
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
  console.log("server started on port 8787");
});
