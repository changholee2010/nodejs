// app.js
// 사용하는 모듈.
const express = require("express");
const fs = require("fs");
const cookieSession = require("cookie-session");
const multer = require("multer");
const { userCheck } = require("./user.js");

// 라우터 모듈.
const customerRouter = require("./routes/customers");
const productRouter = require("./routes/products");
const boardRouter = require("./routes/boards");

// 서버인스턴스.
const app = express();

// 서버 설정.
// body-parser 대신 express 내장함수 사용.
// parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); //user=1234&name=hong
// parsing application/json
app.use(express.json());

// 정적디렉토리 설정.
app.use(express.static("public"));

// 쿠키세션 설정.
app.use(
  cookieSession({
    name: "session",
    keys: ["djkljlk;jlk23r4t23t4", "asdasd234234asdqweqwe"], // 암호화키
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// 파일업로드 설정.
const storage = multer.diskStorage({
  // 업로드된 파일이 저장될 위치 설정.
  destination: function (req, file, cb) {
    const uploadDir = "upload/images";
    if (!fs.existsSync(uploadDir)) {
      // 폴더가 없으면 동기적으로 생성합니다.
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  // 업로드된 파일의 이름 설정.
  filename: function (req, file, cb) {
    // 파일명에 포함된 한글을 Buffer로 처리하여 안전한 파일명 생성
    const originalname = //
      Buffer.from(file.originalname, "latin1").toString("utf8"); // 한글처리.
    cb(null, new Date().valueOf() + originalname); // 2025-08-20-시간+홍길동.jpg
  },
});
// multer 객체 생성.
const upload = multer({ storage: storage });

// 라우팅 정보가 파일로 나눠서 작성.
// customers.js, products.js
app.use("/customers", customerRouter); // '/', '/add'
app.use("/products", productRouter); // '/', '/add'
// app.use("/boards", boardRouter); // '/', '/add'

// 라우팅 정보 : '/' -> 'page정보', '/list' -> '글목록정보'
// get/post/put/delete 요청정보 처리결과 출력.
app.get("/", (req, res) => {
  fs.readFile("./root.html", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST request to the homepage");
});

// 파일업로드 테스트.
app.post("/upload", upload.single("profile"), (req, res) => {
  // 'profile'은 form에서 업로드하는 파일의 name속성값.
  console.log(req.file); // 업로드된 파일 정보.
  res.send("파일 업로드 완료!");
});

// 숙제: 여러파일 업로드 처리.

// login 처리. get/post 비교.
app.get("/login/:username/:password", async (req, res) => {
  const { username, password } = req.params;
  try {
    const result = await userCheck(username, password); // 비동기처리.
    res.send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "서버 내부 오류가 발생했습니다.",
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await userCheck(username, password); // 비동기처리.
    res.send(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "서버 내부 오류가 발생했습니다.",
    });
  }
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

// 테스트.
app.get("/test/:sno/:sname/:score", (req, res) => {
  const { sno, sname, score } = req.params;
  let result = `<table border="1">
    <tr><th>학번</th><td>${sno}</td></tr>
    <tr><th>이름</th><td>${sname}</td></tr>
    <tr><th>합격여부</th><td>${
      score >= 60 ? `합격(${score})` : `불합격(${score})`
    }</td></tr>`;
  res.send(result);
});

app.post("/test", (req, res) => {
  const { sno, sname, score } = req.body;
  let result = `<table border="1">
    <tr><th>학번</th><td>${sno}</td></tr>
    <tr><th>이름</th><td>${sname}</td></tr>
    <tr><th>합격여부</th><td>${
      score >= 60 ? `합격(${score})` : `불합격(${score})`
    }</td></tr>`;
  res.send(result);
});

app.post("/:user/:score", (req, res) => {
  // localhost:3000/hongkildong/90
  console.log(req.params);
  res.send("POST request to the homepage");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
