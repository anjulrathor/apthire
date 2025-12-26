const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { applyForJob, getAllApplications, updateApplicationStatus } = require("../controllers/applicationController");

const router = express.Router();

// Public apply (authenticated candidate)
router.post("/", protect, applyForJob);

// Recruiter/Admin Routes
router.get("/admin", protect, authorize("admin", "recruiter"), getAllApplications);
router.patch("/:id/status", protect, authorize("admin", "recruiter"), updateApplicationStatus);

module.exports = router;
