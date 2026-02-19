const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  exportToCSV,
} = require("../controllers/userController");
const upload = require("../middleware/upload");

/**
 * User Routes
 * Base path: /api/users
 */

// Export CSV - must be defined BEFORE /:id to avoid route conflict
router.get("/export/csv", exportToCSV);

// Get all users (with pagination + search) & Create new user
router.route("/").get(getUsers).post(upload.single("profileImage"), createUser);

// Get, Update, Delete single user by ID
router
  .route("/:id")
  .get(getUserById)
  .put(upload.single("profileImage"), updateUser)
  .delete(deleteUser);

module.exports = router;
