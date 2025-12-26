const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ✅ ENABLE CORS (THIS FIXES FAILED TO FETCH)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/admin", dashboardRoutes);

// Port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
