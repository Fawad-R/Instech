const User = require("../models/User");

// Get all pending users
exports.getPendingUsers = async (req, res) => {
  const users = await User.find({ status: "pending" });
  res.json(users);
};

// Approve user with additional data
exports.approveUser = async (req, res) => {
  const { userId, designation, salary } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { status: "approved", designation, salary },
    { new: true }
  );
  res.json(user);
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  const users = await User.find({ role: "employee" });
  res.json(users);
};
