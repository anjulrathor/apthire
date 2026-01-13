const express = require("express");
const { googleAuth, googleCallback } = require("../controllers/authController");

const router = express.Router();

// Google OAuth routes
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

module.exports = router;
