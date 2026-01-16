const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Add bcryptjs

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
        type: String,
        default: ""
    },
    
    password: {
      type: String,
      required: false, // Optional for Google OAuth users
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values while maintaining uniqueness
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },

    // OTP Verification
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    
    // Naukri-style Profile Data
    profile: {
      headline: { type: String, default: "" },
      location: { type: String, default: "" },
      phone: { type: String, default: "" },
      resumeUrl: { type: String, default: "" }, // Link to Drive/Dropbox
      summary: { type: String, default: "" },
      skills: [{ type: String }], // Array of strings e.g. ["React", "Node"]
      experienceLevel: { 
        type: String, 
        enum: ["fresher", "1-3 years", "3-5 years", "5+ years"], 
        default: "fresher" 
      },
      
      // Simple array objects for mvp
      education: [{ 
        degree: String, 
        college: String, 
        year: String 
      }],
      socialLinks: {
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        portfolio: { type: String, default: "" }
      }
    }
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
