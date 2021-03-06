// DECLARING MODULES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
const bodyParser = require("body-parser");

//DEFINING MODULES
const app = express();
const port = 3001 || process.env.PORT;
const hostname = "localhost";

//VALIDATING MODULES POLICY
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
env.config();

//CONNECTING MONGO DB
const url = process.env.MONGO_URI;

mongoose.connect(`${url}`);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//STARTING APP
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Running at http://${hostname}:${port}/`);
});

app.use("/api/challenge", require("./routes/challenge"));
app.use("/api/user", require("./routes/user"));
app.use("/api/guide", require("./routes/guide"));
app.use("/api/posts", require("./routes/post"));
app.use("/api/buddy", require("./routes/buddy"));
app.use("/api/visit", require("./routes/visitingPlace"));
app.use("/api/task", require("./routes/task"));
app.use("/api/prePlanning", require("./routes/prePlanning"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(422).send({ success: false, error: err.message });
});
