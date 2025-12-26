const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicantName: {
      type: String,
      required: true
    },
    email: { // Snapshot/Convenience field
        type: String, 
        required: true 
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    coverNote: {
      type: String,
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "hired"],
      default: "applied",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
