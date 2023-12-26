var express = require("express");
var router = express.Router();
var db = require("../../db");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "회원가입 실패" });
      return;
    } else {
      res.status(200).send("회원가입 성공");
    }
  });
});

module.exports = router;
