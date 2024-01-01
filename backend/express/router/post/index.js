var express = require("express");
var router = express.Router();
var db = require("../../db");

router.get("/post", (req, res) => {
    const { email, password } = req.body;

    const query = "select * from post_list"
    db.query(query, (err, results) => {
        console.log(results)
        if (err) {
            console.error(err);
            res.status(500).json({ error: "게시글을 불러올 수 없음" });
            return;
        }
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "게시글이 없음" });
        }
    });
});

module.exports = router;
