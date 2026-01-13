const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ADMIN_EMAILS } = require("./userController");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_change_me", {
    expiresIn: "30d",
  });
};

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5001/api/auth/google/callback",
      passReqToCallback: true, // Allow us to see the request for dynamic URL detection
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google OAuth callback triggered");
        console.log("Profile:", profile.emails[0].value);

        const email = profile.emails[0].value;
        const googleId = profile.id;
        const name = profile.displayName;

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
          console.log("Existing user found:", email);
          // Existing user - update googleId if not set
          if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
          }

          // Self-healing: Enforce admin role if in whitelist
          if (ADMIN_EMAILS.includes(email.toLowerCase()) && user.role !== "admin") {
            user.role = "admin";
            await user.save();
          }
        } else {
          console.log("Creating new user:", email);
          // New user - create account
          let role = null; // Default to null for role selection

          // Check if email is in admin whitelist
          if (ADMIN_EMAILS.includes(email.toLowerCase())) {
            role = "admin";
          }

          user = await User.create({
            name,
            email,
            googleId,
            role,
            // No password for Google OAuth users
          });
          console.log("New user created:", user._id);
        }

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// @desc    Initiate Google OAuth
// @route   GET /api/auth/google
// @access  Public
const googleAuth = (req, res, next) => {
  const isLocal = req.get('host').includes('localhost');
  const callbackURL = isLocal 
    ? (process.env.GOOGLE_CALLBACK_URL || "http://localhost:5001/api/auth/google/callback")
    : (process.env.PROD_GOOGLE_CALLBACK_URL || "https://apthire.vercel.app/api/auth/google/callback");

  passport.authenticate("google", {
    scope: ["profile", "email"],
    callbackURL: callbackURL,
  })(req, res, next);
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = (req, res, next) => {
  const isLocal = req.get('host').includes('localhost');
  const frontendUrl = isLocal 
    ? (process.env.FRONTEND_URL || 'http://localhost:3000')
    : (process.env.PROD_FRONTEND_URL || 'https://apthire.vercel.app');

  passport.authenticate("google", { session: false }, (err, user, info) => {
    console.log("Google callback handler called");
    
    if (err) {
      console.error("Authentication error:", err);
      return res.redirect(`${frontendUrl}/login?error=authentication_failed`);
    }

    if (!user) {
      console.error("No user returned from Google");
      return res.redirect(`${frontendUrl}/login?error=no_user`);
    }

    console.log("User authenticated:", user.email);

    // Generate JWT token
    const token = generateToken(user._id);

    // Prepare user data
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("Redirecting user with role:", user.role);

    // Redirect to frontend with token and user data
    if (!user.role) {
      return res.redirect(
        `${frontendUrl}/select-role?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`
      );
    }

    // If role is set, redirect to callback handler
    return res.redirect(
      `${frontendUrl}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`
    );
  })(req, res, next);
};

module.exports = { googleAuth, googleCallback };
