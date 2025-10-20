// crypto.js
const crypto = require("crypto");

let cryptPasswd = crypto
  .createHash("sha256")
  .update("sample123")
  .digest("base64");

console.log(cryptPasswd);

// 1. DB의 값을 암호화값 vs. 사용자 입력한 값 암호화값 => 비교후 판별.
let fixedSalt =
  "qdLbMVVOCmPYBQcnOkUSMyREwSkzvU6ekxszXV3mWCZS2XSXxO1LV0YyfUB2lOHjU5KNdWuSf3T1Qkw0X5Q8rg==";

async function getCryptoPassword(password) {
  // 1. salting 임의의 구문. => 동일한 평문(비밀번호) -> 다른 암호값.
  let salt = crypto.randomBytes(64).toString("base64");
  let dbPass =
    "ylhQLM9dRTBA3RVJjnZnKgaKt0DmjORdR2bDnb43aiLHjSUd9ijndtl0N37+ReAtK+efewkcikq8iiWVfJpJiw==";

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, key) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(key.toString("base64"));
      resolve({ salt: salt, password: key.toString("base64") });
    });
  });
}

getCryptoPassword("sample123")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
