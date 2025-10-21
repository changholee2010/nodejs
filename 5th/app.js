const express = require("express");
const mysql = require("./sql");
const xlsx = require("xlsx");
const multer = require("multer");
const fs = require("fs");
const job = require("./cron");

// 서버인스턴스.
const app = express();
const PORT = 3000;

// 정적디렉토리 설정.
app.use(express.static("public"));

// body-parser 대신 express 내장함수 사용.
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: "50mb",
  })
);

// 파일업로드 설정.
const storage = multer.diskStorage({
  // 업로드된 파일이 저장될 위치 설정.
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
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
    cb(null, new Date().valueOf() + "-" + originalname); // 2025-08-20-시간+홍길동.jpg
  },
});
// multer 객체 생성.
const upload = multer({ storage: storage });

// 라우팅 정보.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// customer 테이블 조회 => 엑셀 => 이메일전송 시 첨부파일.
// '/customerInfo' GET 요청 처리.
app.get("/customerInfo", (req, res) => {
  //
});

// 'cron/start', 'cron/stop' 시작과 종료.
app.get("/cron/start", (req, res) => {
  job.task.start();
  res.json({ job: "start" });
});

app.get("/cron/stop", (req, res) => {
  job.task.stop();
  res.json({ job: "end" });
});

app.post("/upload/:productId/:type/:fileName", (req, res) => {
  const dir = `uploads/${req.params.productId}/${req.params.type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = `${dir}/${req.params.fileName}`;
  const base64Data = req.body.imageBase64.slice(
    req.body.imageBase64.indexOf(";base64") + 8
  );
  fs.writeFile(`${filePath}`, base64Data, "base64", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("파일 저장 중 오류가 발생했습니다.");
    }
    console.log("파일이 성공적으로 저장되었습니다.");
  });
  res.send("OK");
});

app.post("/upload/excels", upload.single("excelFile"), async (req, res) => {
  // 멀티파트 폼데이터 처리. => db 저장.
  console.log(req.file.path); // 업로드된 파일 정보.

  const workbook = xlsx.readFile(`${req.file.path}`);
  const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트명
  const firstSheet = workbook.Sheets[firstSheetName]; // 첫번째 시트
  const excelData = xlsx.utils.sheet_to_json(firstSheet); // 시트 -> json배열

  try {
    // 비동기처리로 인한 응답지연 방지.
    // json배열 -> mysql insert
    for (const item of excelData) {
      await mysql.queryExecute("insert into customers set ?", [item]);
    }
    res.send("파일 업로드 완료!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("데이터베이스 저장 중 오류가 발생했습니다.");
  } finally {
    // 업로드된 파일 삭제.
    // fs.unlink(req.file.path, (err) => {
    //   if (err) {
    //     console.error("파일 삭제 중 오류 발생:", err);
    //   } else {
    //     console.log("업로드된 파일이 삭제되었습니다.");
    //   }
    // });
    console.log("업로드된 파일 경로:", req.file.path);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
