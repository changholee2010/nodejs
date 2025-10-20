const nodemailer = require("nodemailer");

// nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "leadon",
    pass: "hoxwubrkjfvzhirh",
  },
});

// mail 발송 함수.
function myMailingFunc(to, subject, html) {
  const data = {
    from: "leadon@daum.net",
    to: to,
    subject: subject,
    html: html.replace(/\n/g, "<br>"),
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(data, (err, info) => {
      if (err) {
        console.log(err);
        // res.status(500).send({ error: err.message });
        return reject(err);
      } else {
        console.log(info);
        // res.send("Email sent successfully");
        resolve(info);
      }
    });
  });
}

module.exports = { myMailingFunc };
