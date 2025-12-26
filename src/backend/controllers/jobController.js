const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  try {
    const { postedBy, skills, location } = req.query;
    let query = { status: 'active' }; // Default only active jobs

    // Filter by Recruiter
    if (postedBy) {
        query.postedBy = postedBy;
    }

    // Filter by Skills (Simple overlap check)
    if (skills) {
        const skillArray = skills.split(",").map(s => new RegExp(s.trim(), 'i'));
        if (skillArray.length > 0) {
            query.skills = { $in: skillArray };
        }
    }
    
    // Filter by Location
    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }

    // Admins can see "closed" jobs, others only active (unless own)
    // For now we keep it simple: public API returns active.
    
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if(!job) return res.status(404).json({success: false, message: "Job not found"});
        
        res.status(200).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// Create a new job
exports.createJob = async (req, res) => {
  try {
    // Ensure postedBy is set to the current user
    const jobData = { ...req.body, postedBy: req.user.id };
    
    const job = await Job.create(jobData);
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid data",
      error: error.message,
    });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Authorization: Admin or Owner
    if (req.user.role !== 'admin' && job.postedBy.toString() !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: "Not authorized to delete this job"
        });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
