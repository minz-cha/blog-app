import { createConnection } from "mysql";
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "1234",
  database: "blog_db",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL 연결 오류:", err);
    return;
  }
  console.log("MySQL 연결 성공");
});
