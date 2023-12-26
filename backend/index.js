const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8080;

const signupRouter = require("./express/router/signup/index");

app.use(express.json());
app.use(cors());

app.use("/signup", signupRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

