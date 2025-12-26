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
    requirements: {
      type: String, // Bullet points or rich text
      required: false
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for text search and filtering
jobSchema.index({ title: "text", company: "text" }); 
jobSchema.index({ skills: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ postedBy: 1 });

module.exports = mongoose.model("Job", jobSchema);
