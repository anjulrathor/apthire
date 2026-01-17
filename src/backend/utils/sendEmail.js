const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Configure Brevo SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: parseInt(process.env.BREVO_SMTP_PORT),
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
    // Add timeouts to prevent hanging
    connectionTimeout: 10000, 
    socketTimeout: 10000 
  });

  const message = {
    from: `"Apthire Security" <${process.env.EMAIL_FROM}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  console.log(`[MAILER] Using Brevo SMTP`);
  console.log(`[MAILER] Preparing to send email to: ${options.to}`);
  console.log(`[MAILER] From: ${process.env.EMAIL_FROM}`);
  
  try {
    const info = await transporter.sendMail(message);
    console.log(`[MAILER] Email sent successfully! ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`[MAILER] ERROR: Failed to send email to ${options.to}`);
    console.error(`[MAILER] DETAILS:`, error.message);
    throw error; // Re-throw to be handled by controller
  }
};

module.exports = sendEmail;
