const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");
const {
  generatePayroll,
  getMyPayroll,
  getAllPayroll,
  generateAllPayroll
} = require("../controllers/payrollController");

// isAdmin,
router.post("/generate", protect,  generatePayroll);
router.post("/generate-all", protect, isAdmin, generateAllPayroll);
router.get("/me", protect, getMyPayroll);
router.get("/all", protect, isAdmin, getAllPayroll);
// router.get("/payroll/me?month=05&year=2025", protect, isAdmin, getAllPayroll);

module.exports = router;
