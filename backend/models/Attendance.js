const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String, required: true },
  checkIn: String,
  checkOut: String,
  status: { type: String, enum: ["Present", "Leave", "Absent"], default: "Absent" },
  reason: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);
