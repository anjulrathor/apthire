const axios = require("axios");

const sendEmail = async (options) => {
  // Use Brevo API instead of SMTP to avoid port blocking/timeouts
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.error("[MAILER] FATAL: BREVO_API_KEY is missing in .env");
    throw new Error("Email configuration error: API Key missing");
  }

  if (apiKey.startsWith("xsmtpsib-")) {
    console.error("[MAILER] FATAL: You provided an SMTP Key (xsmtpsib-...), but the API requires an API Key (xkeysib-...).");
    console.error("[MAILER] FIX: Go to Brevo -> SMTP & API -> API Keys tab -> Generate new key.");
    throw new Error("Configuration Error: Invalid API Key type. Get a v3 API Key starting with 'xkeysib-'.");
  }

  const emailData = {
    sender: {
      name: "Apthire Security",
      email: process.env.EMAIL_FROM || "apthire.care@gmail.com",
    },
    to: [{ email: options.to }],
    subject: options.subject,
    htmlContent: options.html,
  };

  console.log(`[MAILER] Using Brevo HTTP API`);
  console.log(`[MAILER] Sending to: ${options.to}`);

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      emailData,
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        timeout: 10000 // 10 second timeout
      }
    );

    console.log(`[MAILER] Success! Message ID: ${response.data.messageId}`);
    return response.data;
  } catch (error) {
    console.error(`[MAILER] ERROR: Failed to send email to ${options.to}`);
    
    // Log detailed API error if available
    if (error.response) {
      console.error(`[MAILER] API 4xx/5xx Error:`, error.response.status, JSON.stringify(error.response.data));
    } else {
      console.error(`[MAILER] Network/Code Error:`, error.message);
    }
    
    throw error;
  }
};

module.exports = sendEmail;
