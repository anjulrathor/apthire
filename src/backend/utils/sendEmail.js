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

  console.log(`[MAILER] Preparing to send email to: ${options.to}`);
  console.log(`[MAILER] Using Email: ${process.env.EMAIL_USER}`);
  
  try {
    const info = await transporter.sendMail(message);
    console.log(`[MAILER] SUCCESS: Email sent! ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[MAILER] ERROR: Failed to send email to ${options.to}`);
    console.error(`[MAILER] DETAILS:`, error.message);
    throw error; // Re-throw to be handled by controller
  }
};

module.exports = sendEmail;
