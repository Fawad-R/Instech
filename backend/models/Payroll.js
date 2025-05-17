const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  month: String,
  presentDays: Number,
  leaveDays: Number,
  absentDays: Number,
  totalSalary: Number
});

module.exports = mongoose.model("Payroll", payrollSchema);
