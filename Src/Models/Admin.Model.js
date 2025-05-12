const mongoose = require("mongoose");
const {
  generateRefreshToken,
  generateAccessToken,
  comparePassword,
  hashPassword,
  hash_OTP,
  compareOtp,
} = require("../Utils/Auth.Utils");

const Admin_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    refreshToken: { type: String },
    otp: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

Admin_schema.methods.hashPassword = function (password) {
  return hashPassword.call(this, password);
};

Admin_schema.methods.comparePassword = function (password) {
  return comparePassword.call(this, password);
};

Admin_schema.methods.generate_Access_Token = function () {
  return generateAccessToken.call(this);
};

Admin_schema.methods.generate_Refresh_Token = function () {
  return generateRefreshToken.call(this);
};

Admin_schema.methods.hashing_OTP = function (otp) {
  console.log(otp)
  return hash_OTP.call(this, otp);
};

Admin_schema.methods.compareOtp = function (otp) {
  return compareOtp.call(this, otp);
};

const Admin = mongoose.model("Admin", Admin_schema);
module.exports = Admin;
