const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_SERVER_HOST,
    port: process.env.NODEMAILER_SERVER_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);
};

module.exports = sendEmail;
