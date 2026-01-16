const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add timeouts to prevent hanging
    connectionTimeout: 10000, 
    socketTimeout: 10000 
  });

  const message = {
    from: `"Apthire Security" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  console.log(`Attempting to send email to: ${options.to}`);
  const info = await transporter.sendMail(message);
  console.log(`Email sent: ${info.messageId}`);
};

module.exports = sendEmail;
