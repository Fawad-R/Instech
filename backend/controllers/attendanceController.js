const Attendance = require("../models/Attendance");
const dayjs = require("dayjs");

exports.checkIn = async (req, res) => {
  const date = dayjs().format("YYYY-MM-DD");
  const existing = await Attendance.findOne({ userId: req.user._id, date });
  if (existing) return res.status(400).json({ message: "Already checked in" });

  const attendance = await Attendance.create({
    userId: req.user._id,
    date,
    checkIn: dayjs().format("HH:mm:ss"),
    status: "Present"
  });
  res.json(attendance);
};

exports.checkOut = async (req, res) => {
  const date = dayjs().format("YYYY-MM-DD");
  const attendance = await Attendance.findOne({ userId: req.user._id, date });
  if (!attendance || attendance.checkOut) return res.status(400).json({ message: "No check-in or already checked out" });

  attendance.checkOut = dayjs().format("HH:mm:ss");
  await attendance.save();
  res.json(attendance);
};

exports.applyLeave = async (req, res) => {
  const { date, reason } = req.body;
  const existing = await Attendance.findOne({ userId: req.user._id, date });
  if (existing) return res.status(400).json({ message: "Attendance already marked" });

  const leave = await Attendance.create({
    userId: req.user._id,
    date,
    status: "Leave",
    reason
  });
  res.json(leave);
};

exports.getMyAttendance = async (req, res) => {
  console.log('req.user',req.user)
  const records = await Attendance.find({ userId: req.user._id });
  res.json(records);
};

exports.getAllAttendance = async (req, res) => {
  const records = await Attendance.find().populate("userId", "name email");
  res.json(records);
};
