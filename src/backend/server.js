const path = require("path");
// Try to load .env from current directory, but don't fail if it's missing (Render/Vercel handles it)
require("dotenv").config();
// Fallback to specific path only if root .env didn't have what we need
require("dotenv").config({ path: path.join(__dirname, ".env") });

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

const allowedOrigins = [
  "http://localhost:3000",
  "https://apthire.vercel.app",
  "https://www.apthire.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || 
                       origin.endsWith(".vercel.app") ||
                       (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL);

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        console.log("Allowed Origins:", allowedOrigins);
        callback(new Error("Not allowed by CORS"));
      }
    },
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
