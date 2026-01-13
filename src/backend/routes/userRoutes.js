const express = require("express");
const { registerUser, loginUser, getUsers, deleteUser, getMe, updateUserProfile, updateUserRole } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Personal Profile Routes
router.get("/me", protect, getMe);
router.put("/profile", protect, updateUserProfile);
router.put("/role", protect, updateUserRole); // New: Role selection for Google OAuth users

// Admin only routes
router.get("/", protect, authorize("admin"), getUsers); // List all users
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
