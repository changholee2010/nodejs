const cron = require("node-cron"); // 주기적인 작업처리.
const winston = require("winston"); // 로그관리 모듈.
const mysql = require("../sql");

const logger = winston.createLogger({
  level: "info", // error>warn>info>http>verbose>debug>silly
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf((info) => `${info.message}`)
  ),
  transports: [new winston.transports.File({ filename: "log/customers.log" })],
});

async function customerList() {
  try {
    let result = await mysql.queryExecute("select * from customers", []);
    logger.info("start");
    logger.info(`id/name/email/phone/address\n`);
    result.forEach(({ id, name, email, phone, address }) => {
      logger.info(`${id}/${name}/${email}/${phone}/${address}\n`);
    });
    logger.info("end");
  } catch (err) {
    logger.error(`${err}`);
  }
}

const task = cron.schedule(
  "*/10 * * * * *",
  () => {
    console.log("cron job이 실행되었습니다.", new Date());
    // customerList();
  },
  { scheduled: false }
);
task.stop();

module.exports = {
  logger,
  task,
};
