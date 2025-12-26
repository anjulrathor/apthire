const User = require("../models/User");
const Job = require("../models/Job");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    // Assuming we might want more complex stats later
    
    // Recent 5 users
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalJobs,
      },
      recentUsers
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
  }
};
