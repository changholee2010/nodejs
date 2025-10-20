const crypto = require("crypto");

function generateHash(password, hashSalt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, hashSalt, 100000, 64, "sha512", (err, key) => {
      if (err) {
        return reject(err);
      }
      resolve({ salt: hashSalt, password: key.toString("base64") }); // 비동기처리의 결과.
    });
  });
}

function randomBytes(size) {
  return crypto.randomBytes(size);
}

module.exports = {
  generateHash,
  randomBytes,
};
