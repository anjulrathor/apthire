const express = require("express");
const router = express.Router();
const { getJobs, createJob, deleteJob, getJobById } = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", protect, authorize("admin", "recruiter"), createJob);
router.delete("/:id", protect, authorize("admin"), deleteJob);

module.exports = router;
