const express = require("express");
const router = express.Router();
const { getJobs, createJob, deleteJob } = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getJobs); // Public to view jobs
router.post("/", protect, authorize("admin", "recruiter"), createJob); // Only admin/recruiter can post
router.delete("/:id", protect, authorize("admin"), deleteJob); // Only admin can delete

module.exports = router;
