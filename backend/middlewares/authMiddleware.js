const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  // const token = req.headers.cookie;
  const getCookieValue = (cookieStr, name) => {
    return cookieStr
      ?.split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  };
  const token = getCookieValue(req.headers.cookie, 'user');
  console.log('req.headers', req.headers)
  console.log('token', token)
  // console.log('req.headers.authorization', req.headers.authorization)
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    
    console.log('decoded:',process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded:', decoded);
    req.user = await User.findById(decoded.userId._id).select("-password");
    console.log('decoded req.user:', req.user);

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = { protect };
