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

function mailSendFunc() {
  const data = {
    from: "leadon@daum.net",
    to: "cholee@yedam.ac",
    cc: "leadon@daum.net",
    subject: "subject",
    html: "Sample Content",
    attachments: [
      {
        filename: "customers.xlsx",
        path: "./files/customers.xlsx",
      },
    ],
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
} // end of mailSendFunc.
mailSendFunc();
