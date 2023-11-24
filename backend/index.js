const express = require("express");
const path = require("path");
const app = express();
const signupRouter = require("./signup");

app.use(express.json());
var cors = require("cors");
app.use(cors());

app.use("/signup", signupRouter);

app.listen(8080, function () {
  console.log("Server Started");
});
