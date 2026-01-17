const express = require("express");
const { registerUser, loginUser, getUsers, deleteUser, getMe, updateUserProfile, updateUserRole, changePassword, verifyOTP, resendOTP, forgotPassword, resetPassword } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Personal Profile Routes
router.get("/me", protect, getMe);
router.put("/profile", protect, updateUserProfile);
router.put("/role", protect, updateUserRole);
router.put("/password", protect, changePassword);

// Admin only routes
router.get("/", protect, authorize("admin"), getUsers); // List all users
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
