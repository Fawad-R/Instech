const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["employee", "admin"], default: "employee" },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
    designation: String,
    salary: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
