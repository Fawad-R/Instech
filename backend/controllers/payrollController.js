const Attendance = require("../models/Attendance");
const Payroll = require("../models/Payroll");
const User = require("../models/User");

const moment = require('moment');
// const Attendance = require('../models/Attendance');
// const User = require('../models/User');

exports.generatePayroll = async (req, res) => {
  try {
    let { employeeId, month, year } = req.body;

    // Default to logged-in user if 'me'
    if (employeeId === 'me') {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      employeeId = req.user._id;
    }

    const user = await User.findById(employeeId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const start = moment(`${year}-${month}-01`);
    const end = start.clone().endOf('month');
    const allDates = [];

    for (let date = start.clone(); date.isSameOrBefore(end); date.add(1, 'day')) {
      if (![0, 6].includes(date.day())) {
        allDates.push(date.clone());
      }
    }

    const attendanceRecords = await Attendance.find({
      user: employeeId,
      date: { $gte: start.toDate(), $lte: end.toDate() },
    });

    const attendanceMap = {};
    attendanceRecords.forEach((rec) => {
      const key = moment(rec.date).format('YYYY-MM-DD');
      attendanceMap[key] = rec.status;
    });

    let present = 0, leave = 0, absent = 0;
    const detailedRecords = [];

    allDates.forEach((date) => {
      const key = date.format('YYYY-MM-DD');
      const status = attendanceMap[key];

      if (status === 'Present') present++;
      else if (status === 'Leave') leave++;
      else absent++;

      detailedRecords.push({
        date: key,
        status: status || 'Absent',
      });
    });

    const perDaySalary = user.salary / allDates.length;
    const totalSalary = perDaySalary * (present + leave);

    return res.status(200).json({
      employee: user.name,
      designation: user.designation,
      present,
      leave,
      absent,
      totalDays: allDates.length,
      totalSalary,
      detailedRecords,
    });
  } catch (error) {
    console.error('Error generating payroll:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.generateAllPayroll = async (req, res) => {
  try {
    const { month, year } = req.body;
    const start = moment(`${year}-${month}-01`);
    const end = start.clone().endOf('month');

    // Weekdays in the month (Mon-Fri)
    const workingDays = [];
    for (let date = start.clone(); date.isSameOrBefore(end); date.add(1, 'day')) {
      if (![0, 6].includes(date.day())) {
        workingDays.push(date.clone());
      }
    }

    const users = await User.find({ status: "approved" });

    const payrolls = [];

    for (const user of users) {
      const attendanceRecords = await Attendance.find({
        user: user._id,
        date: { $gte: start.toDate(), $lte: end.toDate() },
      });

      const attendanceMap = {};
      attendanceRecords.forEach((rec) => {
        const key = moment(rec.date).format("YYYY-MM-DD");
        attendanceMap[key] = rec.status;
      });

      let present = 0, leave = 0, absent = 0;
      const detailedRecords = [];

      workingDays.forEach((date) => {
        const key = date.format("YYYY-MM-DD");
        const status = attendanceMap[key];

        if (status === "Present") present++;
        else if (status === "Leave") leave++;
        else absent++;

        detailedRecords.push({
          date: key,
          status: status || "Absent",
        });
      });

      const perDaySalary = user.salary / workingDays.length;
      const totalSalary = perDaySalary * (present + leave);

      payrolls.push({
        employee: user.name,
        email: user.email,
        designation: user.designation,
        present,
        leave,
        absent,
        totalDays: workingDays.length,
        totalSalary,
        detailedRecords,
      });
    }

    res.status(200).json(payrolls);
  } catch (err) {
    console.error("Error generating payroll for all users:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getMyPayroll = async (req, res) => {
  const records = await Payroll.find({ userId: req.user._id });
  res.json(records);
};

exports.getAllPayroll = async (req, res) => {
  const records = await Payroll.find().populate("userId", "name email");
  res.json(records);
};
