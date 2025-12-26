const Application = require("../models/Application");
const Job = require("../models/Job");

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Jobseeker)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverNote, resumeUrl } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if duplicate application
    const alreadyApplied = await Application.findOne({ jobId, userId: req.user.id });
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    // Create Application
    const application = await Application.create({
      jobId,
      userId: req.user.id,
      applicantName: req.user.name,
      email: req.user.email,
      resumeUrl: resumeUrl || req.user.profile?.resumeUrl,
      coverNote
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all applications (Admin/Recruiter)
// @route   GET /api/applications/admin
// @access  Private (Admin/Recruiter)
exports.getAllApplications = async (req, res) => {
  try {
    let query = {};
    
    // If recruiter, only see applications for their jobs
    if (req.user.role === 'recruiter') {
        const myJobs = await Job.find({ postedBy: req.user.id }).select("_id");
        const jobIds = myJobs.map(j => j._id);
        query = { jobId: { $in: jobIds } };
    }

    const applications = await Application.find(query)
       .populate("jobId", "title company postedBy")
       .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Application Status
// @route   PATCH /api/applications/:id/status
// @access  Private (Admin/Recruiter)
exports.updateApplicationStatus = async (req, res) => {
  try {
     const { status } = req.body;
     const app = await Application.findById(req.params.id).populate("jobId");

     if (!app) {
         return res.status(404).json({ success: false, message: "Application not found" });
     }

     // Authorization Check: Admin or the Recruiter who posted the job
     const isJobOwner = app.jobId && app.jobId.postedBy && app.jobId.postedBy.toString() === req.user.id;
     
     if (req.user.role !== 'admin' && !isJobOwner) {
         return res.status(403).json({
             success: false,
             message: "Not authorized to update this application status"
         });
     }

     app.status = status;
     await app.save();

     res.status(200).json({ success: true, app });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};
