const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_change_me", {
    expiresIn: "30d",
  });
};

// Hardcoded Admin Whitelist
const ADMIN_EMAILS = [
    "anjulrathor.dev@gmail.com",
    "apthire.care@gmail.com"
];

// @desc    Register new user & Send OTP
// @route   POST /api/users/register
// @access  Public
// @desc    Register new user & Send OTP
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    console.log(`[DEBUG] Register request for: ${req.body.email}`);
    const { name, email, password, role } = req.body;

    // First check if this guy already signed up
    let userExists = await User.findOne({ email });

    // If account exists but they didnt verify otp yet, we delete it and start fresh
    // so they dont get blocked by "email already exists" error
    if (userExists) {
      if (!userExists.isVerified) {
        await userExists.deleteOne();
        console.log(`Deleted old unverified account causing trouble: ${email}`);
      } else {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    // Determine Role (Admin or Candidate)
    // admin emails are hardcoded in a list above
    let finalRole = role || "candidate"; 
    if (ADMIN_EMAILS.includes(email.toLowerCase())) {
        finalRole = "admin";
    } else if (role === "admin") {
        finalRole = "candidate"; // force them to be candidate if they try to be admin without permission
    }

    // Generate a 4 digit OTP for email
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt); // store it hashed so its safe
    const otpExpiresAt = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

    // Create the user in database but mark as NOT verified
    const user = await User.create({
      name,
      email,
      password,
      role: finalRole,
      otp: hashedOtp,
      otpExpiresAt,
      isVerified: false // important! verify later
    });

    if (user) {
        // Prepare the nice email html
        const message = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Verify your Apthire account</h2>
            <p>Thanks for signing up! Please use the following OTP to verify your email address:</p>
            <h1 style="color: #10b981; letter-spacing: 5px;">${otp}</h1>
            <p>This OTP is valid for <strong>5 minutes</strong>.</p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
                If you didn't request this, please ignore this email. Do not share your OTP with anyone.
            </p>
          </div>
        `;

        try {
            // Try sending the email via gmail
            await sendEmail({
                to: email,
                subject: "Verify your Apthire account",
                html: message
            });

            // If success, tell frontend we are good
            res.status(201).json({
                success: true,
                message: "OTP sent to email. Please verify to login.",
                email: user.email
            });
        } catch (emailError) {
             // If email fails (maybe gmail is down or pw is wrong), delete the user
             // so they can try again later without "user exists" error
             console.error("Email send failed, deleting user", emailError);
             await user.deleteOne();
             return res.status(500).json({
                 success: false, 
                 message: "Failed to send OTP email. Please check your email configuration and try again.",
                 error: emailError.message
             });
        }

    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified. Please login." });
        }

        if (!user.otp || !user.otpExpiresAt) {
             return res.status(400).json({ message: "No OTP found. Please request a new one." });
        }

        if (user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP expired. Please request a new one." });
        }

        const isMatch = await bcrypt.compare(otp, user.otp);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Verify User
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.json({
            success: true,
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Resend OTP
// @route   POST /api/users/resend-otp
// @access  Public
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        // Generate New OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);
        const otpExpiresAt = Date.now() + 5 * 60 * 1000;

        user.otp = hashedOtp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        // Send Email
        const message = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Verify your Apthire account (Resent)</h2>
          <p>Here is your new OTP:</p>
          <h1 style="color: #10b981; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        </div>
        `;

        try {
            await sendEmail({
                to: email,
                subject: "Verify your Apthire account (New OTP)",
                html: message
            });
            res.status(200).json({ success: true, message: "New OTP sent" });
        } catch (emailError) {
            res.status(500).json({ message: "Failed to send email" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
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
      
      // Check Verification
      if (!user.isVerified) {
          return res.status(403).json({ 
              message: "Email not verified. Please verify your email.",
              isVerified: false,
              email: user.email 
          });
      }

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

    if (user.role) {
      return res.status(400).json({ 
        message: "Role already set. Cannot change role." 
      });
    }

    if (role === "admin") {
      return res.status(403).json({ 
        message: "Cannot self-assign admin role" 
      });
    }

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

// @desc    Change user password
// @route   PUT /api/users/password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password && !currentPassword) {
        user.password = newPassword;
        await user.save();
        return res.json({ success: true, message: "Password set successfully" });
    }

    if (user.password && !(await user.matchPassword(currentPassword))) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
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
  changePassword,
  verifyOTP,
  resendOTP,
  ADMIN_EMAILS
};
