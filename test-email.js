require('dotenv').config({ path: './src/backend/.env' });
const nodemailer = require('nodemailer');

console.log('Testing Gmail SMTP Connection...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? `${process.env.EMAIL_PASS.substring(0, 4)}****` : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log('\n❌ SMTP Connection FAILED:');
    console.log(error.message);
    console.log('\nPossible issues:');
    console.log('1. App Password is incorrect');
    console.log('2. 2-Step Verification not enabled');
    console.log('3. App Password was revoked');
    console.log('\nPlease generate a NEW App Password from:');
    console.log('https://myaccount.google.com/apppasswords');
  } else {
    console.log('\n✅ SMTP Connection SUCCESS!');
    console.log('Gmail is ready to send emails.');
  }
  process.exit(error ? 1 : 0);
});
