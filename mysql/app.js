const express = require("express");
const cors = require("cors");

const mysql = require("./sql/index");
const mailer = require("./mailer/index");
const crypto = require("./crypto/index");

// express app setup
const app = express();
const port = 3000;

// 정적디렉토리 설정.
app.use(express.static("public"));
app.use(cors());

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 로그인.
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body; // 사용자 입력값
    let result = await mysql.queryExecute(
      "select * from customers where email=?",
      [email]
    );
    // email 존재여부 확인.
    if (result.length === 0) {
      return res.status(401).send({ error: "Invalid email or password" });
    }
    // 조회결과.
    const user = result[0];
    const promise = await crypto.generateHash(password, user.password_salt);
    let cryptoData = await promise;
    // password hash 비교.
    if (cryptoData.password === user.password_hash) {
      res.send({ message: "Login successful", userId: user.id });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 회원가입.
app.post("/signup", async (req, res) => {
  try {
    const { userid, password, email, phone } = req.body; // 사용자 입력값
    // 비동기처리 => 동기처리.
    let salt = crypto.randomBytes(64).toString("base64"); // salt 생성
    const promise = await crypto.generateHash(password, salt);
    let cryptoData = await promise;
    // db insert values.
    const param = {
      name: userid,
      password_hash: cryptoData.password,
      password_salt: cryptoData.salt,
      email: email,
      phone: phone,
    };
    let result = await mysql.queryExecute(`insert into customers set ?`, param);
    // insert 쿼리 실행
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 새로운 비밀번호 발송.
app.get("/sendmail", async (req, res) => {
  const { userid, phone } = req.query;
  let result = await mysql.queryExecute(
    "select * from customers where name=? and phone=?",
    [userid, phone]
  );
  if (result.length === 0) {
    return res.send("No matching user found");
  }
  // to, subject, html
  const to = result[0].email;
  const subject = "Check New Password";
  const html = `<h3>Your New Passworkd is 12345</h3>`;

  try {
    let result = await mailer.myMailingFunc(to, subject, html);
    if (result.accepted.length > 0) {
      console.log("Email sent successfully to: " + result.accepted.join(", "));
    } else {
      console.log("Email sending failed.");
    }
    res.send(result.accepted.join(", ") + "에게 메일 발송 완료");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// mail 발송.
app.post("/sendmail", async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    let result = await mailer.myMailingFunc(to, subject, message);
    if (result.accepted.length > 0) {
      console.log("Email sent successfully to: " + result.accepted.join(", "));
    } else {
      console.log("Email sending failed.");
    }
    res.send(result.accepted.join(", ") + "에게 메일 발송 완료");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// customers table - select all(목록조회)
app.get("/customers", async (req, res) => {
  try {
    let result = await mysql.queryExecute("select * from customers", []);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//  단건조회.
app.get("/customer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let result = await mysql.queryExecute(
      "select * from customers where id=?",
      [id]
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// 고객추가
app.post("/customer", async (req, res) => {
  try {
    const param = req.body.param;
    // insert 쿼리 실행
    let result = await mysql.queryExecute(`insert into customers set ?`, param);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// 고객삭제
app.delete("/customer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete 쿼리 실행
    let result = await mysql.queryExecute(
      `delete from customers where id = ?`,
      [id]
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// 고객수정
app.put("/customer", async (req, res) => {
  try {
    const param = req.body.param; // [{name:'test',email:'email'}, 6]
    // delete 쿼리 실행
    let result = await mysql.queryExecute(
      `update customers set ? where id = ?`,
      param
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// server start
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
