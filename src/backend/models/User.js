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
    
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
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
        linkedin: String,
        github: String,
        portfolio: String
      }
    }
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
