const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ ENABLE CORS (THIS FIXES FAILED TO FETCH)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/admin", dashboardRoutes);
app.use("/api/auth", authRoutes); // Google OAuth routes
app.use("/api/leads", require("./routes/leadRoutes"));

// Port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
