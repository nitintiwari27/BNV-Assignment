const User = require("../models/User");
const { exportUsersToCSV } = require("../utils/csvExporter");
const fs = require("fs");
const path = require("path");

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, mobile, gender, status, location } =
      req.body;

    // Build user data object
    const userData = {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      status,
      location,
    };

    // Attach profile image path if uploaded
    if (req.file) {
      userData.profileImage = `/uploads/${req.file.filename}`;
    }

    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all users with pagination and search
 * @route   GET /api/users
 * @access  Public
 * @query   page, limit, search
 */
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    // Build search query - case-insensitive search on name and email
    const searchQuery = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Execute query with pagination
    const [users, totalRecords] = await Promise.all([
      User.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(searchQuery),
    ]);

    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a user by ID
 * @route   PUT /api/users/:id
 * @access  Public
 */
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const { firstName, lastName, email, mobile, gender, status, location } =
      req.body;

    // Build update object
    const updateData = {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      status,
      location,
    };

    // If a new profile image is uploaded, delete the old one and update path
    if (req.file) {
      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, "..", user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validators on update
      }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/users/:id
 * @access  Public
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Delete profile image from filesystem if exists
    if (user.profileImage) {
      const imagePath = path.join(__dirname, "..", user.profileImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Export all users to CSV
 * @route   GET /api/users/export/csv
 * @access  Public
 */
const exportToCSV = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).lean();

    if (!users.length) {
      res.status(404);
      throw new Error("No users found to export");
    }

    const csv = exportUsersToCSV(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="users_${Date.now()}.csv"`
    );
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  exportToCSV,
};
