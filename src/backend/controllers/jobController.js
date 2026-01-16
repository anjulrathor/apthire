const Job = require("../models/Job");
const User = require("../models/User");

// Smart job matching logic
const matchJobToCandidate = (job, candidate) => {
  if (!candidate || !candidate.profile) return false;

  const profile = candidate.profile;
  const candidateSkills = (profile.skills || []).map(s => s.toLowerCase());
  const jobSkills = (job.skills || []).map(s => s.toLowerCase());
  
  // Rule 1: At least ONE skill must match
  const hasSkillMatch = candidateSkills.some(cs => 
    jobSkills.some(js => js.includes(cs) || cs.includes(js))
  );
  
  if (!hasSkillMatch) return false;

  // Rule 2: Experience level matching (allow ±2 years flexibility)
  const experienceLevels = {
    'fresher': 0,
    '1-3 years': 2,
    '3-5 years': 4,
    '5+ years': 6
  };

  const candidateExp = experienceLevels[profile.experienceLevel] || 0;
  const jobExpStr = (job.experience || '').toLowerCase();
  
  let jobExpMin = 0;
  if (jobExpStr.includes('1-3')) jobExpMin = 1;
  else if (jobExpStr.includes('3-5')) jobExpMin = 3;
  else if (jobExpStr.includes('5+')) jobExpMin = 5;
  
  // Exclude if experience gap > 2 years
  if (Math.abs(candidateExp - jobExpMin) > 2) return false;

  // Rule 3: Location preference (if candidate specified)
  if (profile.location && job.location) {
    const candidateLoc = profile.location.toLowerCase();
    const jobLoc = job.location.toLowerCase();
    
    // Remote jobs always match
    if (jobLoc.includes('remote')) return true;
    
    // If candidate prefers specific location, check match
    if (!candidateLoc.includes('remote') && 
        !jobLoc.includes(candidateLoc) && 
        !candidateLoc.includes(jobLoc)) {
      return false;
    }
  }

  return true;
};

exports.getJobs = async (req, res) => {
  try {
    const { postedBy, skills, location, userId } = req.query;
    let query = { status: 'active' };

    // Filter by Recruiter (for recruiter dashboard)
    if (postedBy) {
        query.postedBy = postedBy;
    }

    // Fetch all active jobs
    let jobs = await Job.find(query).sort({ createdAt: -1 });

    // Smart matching for logged-in candidates
    if (userId && !postedBy) {
      try {
        const candidate = await User.findById(userId);
        
        if (candidate && candidate.role === 'candidate') {
          // Filter jobs based on candidate profile
          jobs = jobs.filter(job => matchJobToCandidate(job, candidate));
        }
      } catch (err) {
        console.error('Error fetching candidate profile:', err);
      }
    }

    // Manual filters (legacy support)
    if (skills) {
        const skillArray = skills.split(",").map(s => new RegExp(s.trim(), 'i'));
        if (skillArray.length > 0) {
            jobs = jobs.filter(job => 
              job.skills.some(s => skillArray.some(regex => regex.test(s)))
            );
        }
    }
    
    if (location) {
        const locRegex = new RegExp(location, 'i');
        jobs = jobs.filter(job => locRegex.test(job.location));
    }

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
