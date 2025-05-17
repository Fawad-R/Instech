const isAdmin = (req, res, next) => {
  console.log('req.user',req.user)
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  next();
};

module.exports = { isAdmin };
