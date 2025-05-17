const router = require("express").Router();
const { getPendingUsers, approveUser, getAllEmployees } = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.get("/pending", protect, isAdmin, getPendingUsers);
router.put("/approve", protect, isAdmin, approveUser);
router.get("/employees", protect, isAdmin, getAllEmployees);

module.exports = router;
