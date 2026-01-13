const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public route to submit contact form
router.post("/", leadController.createLead);

// Protected admin routes to manage leads
router.get("/", protect, admin, leadController.getLeads);
router.delete("/:id", protect, admin, leadController.deleteLead);

module.exports = router;
