const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.json());
var cors = require("cors");
app.use(cors());

// app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "secret test",
//     resave: false,
//     saveUninitialized: true,
//     store: new FileStore(),
//   })
// );

app.use(express.static(path.join(__dirname, "frontend/build")));

app.listen(8080, function () {
  console.log("Server Started");
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});
