const express = require("express");
const { registerUser, loginUser, getUsers, deleteUser } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin only routes
router.get("/", protect, authorize("admin"), getUsers);
// Keeping the original /users post for compatibility if needed, but /register is better
router.post("/", registerUser); 

router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
