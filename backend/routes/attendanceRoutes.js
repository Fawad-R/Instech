const router = require("express").Router();
const {
  checkIn, checkOut, applyLeave, getMyAttendance, getAllAttendance
} = require("../controllers/attendanceController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/check-in", protect, checkIn);
router.post("/check-out", protect, checkOut);
router.post("/leave", protect, applyLeave);
router.get("/me", protect, getMyAttendance);
router.get("/all", protect, isAdmin, getAllAttendance);
// router.get("/all", getAllAttendance);

module.exports = router;
