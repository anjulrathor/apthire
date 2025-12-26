const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getDashboardStats = async (req, res) => {
  try {
    const isRecruiter = req.user.role === 'recruiter';
    const userId = req.user.id;

    let userQuery = {};
    let jobQuery = {};
    let appQuery = {};

    if (isRecruiter) {
        // Recruiters only see their own jobs and applications for those jobs
        const myJobs = await Job.find({ postedBy: userId }).select("_id");
        const jobIds = myJobs.map(j => j._id);
        
        jobQuery = { postedBy: userId };
        appQuery = { jobId: { $in: jobIds } };
    }

    // Basic counts
    const totalUsers = isRecruiter ? 0 : await User.countDocuments(); // Recruiters don't see total users
    const totalJobs = await Job.countDocuments(jobQuery);
    const totalApplications = await Application.countDocuments(appQuery);
    const totalHired = await Application.countDocuments({ ...appQuery, status: "hired" });
    
    // Stats for Recruiters: Show status breakdown instead of role stats
    let roleStats = { admin: 0, recruiter: 0, candidate: 0 };
    if (!isRecruiter) {
        const usersByRole = await User.aggregate([
          { $group: { _id: "$role", count: { $sum: 1 } } }
        ]);
        usersByRole.forEach(role => {
          if (roleStats.hasOwnProperty(role._id)) {
            roleStats[role._id] = role.count;
          }
        });
    }

    // Application trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const applicationTrends = await Application.aggregate([
      { $match: { ...appQuery, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Jobs posted trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const jobTrends = await Job.aggregate([
      { $match: { ...jobQuery, createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalJobs,
        totalApplications,
        totalHired,
        roleStats,
        applicationTrends: applicationTrends.map(item => ({ name: item._id, applications: item.count })),
        jobTrends: jobTrends.map(item => ({ name: item._id, count: item.count }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
