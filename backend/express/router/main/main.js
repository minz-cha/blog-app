const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '1234',
    database: 'blog_db',
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

app.use(bodyParser.json());
app.use(session({
    secret: 'secret test',   // 원하는 문자 입력
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중...`);
});
