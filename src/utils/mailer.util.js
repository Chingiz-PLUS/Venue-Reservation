const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port == 465,
  auth: {
    user: config.smtp.username,
    pass: config.smtp.password,
  },
});

const sendMail = async ({ from, to, subject, text }) => {
  const mailOptions = {
    from: from || config.smtp.from,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendMail };
