const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  console.log(process.env.JWT_SECRET)
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;
// const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//   return jwt.sign(
//     { _id: user._id},
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );
// };
// console.log('generateToken',generateToken)
// module.exports = generateToken;
