const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter job title"],
      trim: true,
      maxLength: [100, "Job title cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Please enter company name"],
      trim: true,
    },
    logo: {
      type: String,
      default: "", 
    },
    skills: {
      type: [String],
      required: true,
    },
    experience: {
      type: String, // e.g., "0-1 yrs"
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String, // e.g., "₹18k - ₹25k"
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please enter job description"],
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for now, can be strict later
    },
    isActive: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
