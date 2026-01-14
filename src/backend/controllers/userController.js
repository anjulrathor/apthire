const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_change_me", {
    expiresIn: "30d",
  });
};

// Hardcoded Admin Whitelist
const ADMIN_EMAILS = [
    "admin@apthire.com",
    "ceo@apthire.com",
    "anjulrathor.dev@gmail.com"
];

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine Role
    let finalRole = role || "candidate"; // Default
    if (ADMIN_EMAILS.includes(email.toLowerCase())) {
        finalRole = "admin";
    } else if (role === "admin") {
        // Prevent manual admin creation not in whitelist
        finalRole = "candidate"; 
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: finalRole
    });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Self-healing: Enforce admin role if in whitelist (fixes stale data)
      if (ADMIN_EMAILS.includes(email.toLowerCase()) && user.role !== 'admin') {
          user.role = 'admin';
          await user.save();
      }

      res.json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
  
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      await user.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      const updates = {
         name: req.body.name || user.name
      };

      if (req.body.profile) {
        for (const [key, value] of Object.entries(req.body.profile)) {
           if (value !== undefined) {
              updates[`profile.${key}`] = value;
           }
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true, runValidators: false }
      );

      res.json({
        success: true,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profile: updatedUser.profile,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role (for new Google OAuth users)
// @route   PUT /api/users/role
// @access  Private
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only allow role update if current role is null/undefined
    if (user.role) {
      return res.status(400).json({ 
        message: "Role already set. Cannot change role." 
      });
    }

    // Prevent self-assignment of admin role
    if (role === "admin") {
      return res.status(403).json({ 
        message: "Cannot self-assign admin role" 
      });
    }

    // Validate role
    if (!["candidate", "recruiter"].includes(role)) {
      return res.status(400).json({ 
        message: "Invalid role. Must be 'candidate' or 'recruiter'" 
      });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  getUsers, 
  deleteUser, 
  getMe, 
  updateUserProfile,
  updateUserRole,
  ADMIN_EMAILS // Export for use in authController
};
