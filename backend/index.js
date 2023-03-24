const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { authRoute } = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/",authRoute)
app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.listen(8585, async () => {
  try {
    await connection;
    console.log("connection established");
  } catch (err) {
    console.log(err);
  }
  console.log("server started on port 8787");
});
