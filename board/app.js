// board 서버 프로그램 생성.
const express = require("express");
const cors = require("cors");

const mysql = require("./sql/index");

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

app.get("/boards", async (req, res) => {
  try {
    let result = await mysql.queryExecute("select * from tbl_board", []);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/board/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let result = await mysql.queryExecute(
      "select * from tbl_board where id=?",
      [id]
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/board", async (req, res) => {
  console.log(req.body); //{ param: { title: '글등록', content: '연습입니다.', writer: 'user01' } }
  try {
    const param = req.body.param;
    // insert 쿼리 실행
    let result = await mysql.queryExecute(`insert into tbl_board set ?`, [
      param,
    ]);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

app.put("/board", async (req, res) => {
  try {
    const param = req.body.param; // [{name:'test',email:'email'}, 6]
    // delete 쿼리 실행
    let result = await mysql.queryExecute(
      `update tbl_board set ? where id = ?`,
      param
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.delete("/board/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete 쿼리 실행
    let result = await mysql.queryExecute(
      `delete from tbl_board where id = ?`,
      [id]
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
