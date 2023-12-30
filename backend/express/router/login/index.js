var express = require("express");
var router = express.Router();
var db = require("../../db");

router.post("/", (req, res) => {
    const { email, password } = req.body;

    const query = "select * from users where email = ? and password = ?"
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "로그인 실패" });
            return;
        }
        if (results.length > 0) {
            res.status(200).send("로그인 성공")
        } else {
            res.status(401).json({ error: "잘못된 이메일 또는 비밀번호" })
        }
    });
});

module.exports = router;
