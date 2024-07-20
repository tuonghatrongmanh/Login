const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "LoginSystem",
});


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) { // Sửa: Kiểm tra nếu có kết quả trả về
                res.send(result);
            } else {
                res.send({ message: "Bạn đã đăng nhập thất bại" }); // Sửa: Thêm phản hồi lỗi khi không tìm thấy người dùng
            }
        }
    );
});

app.listen(3001, () => {
    console.log("chạy cổng server 3001");
});
