var express = require('express');
var router = express.Router();
var db = require('../../db');

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '회원가입 실패' });
        } else {
            res.json({ success: '회원가입 성공' });
        }
    });
});