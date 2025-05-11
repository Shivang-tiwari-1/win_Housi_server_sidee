const mongoose = require("mongoose");
const {
  generateRefreshToken,
  generateAccessToken,
  comparePassword,
  hashPassword,
  hash_OTP,
  compareOtp,
} = require("../Utils/Auth.Utils");

const user_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    profileImage: { type: String, unique: true },
    refreshToken: { type: String },
    otp: { type: String },
    history: [{ day_time_date: { type: String }, contestId: { type: String } }], 
  },
  { timestamps: true }
);

user_schema.methods.hashPassword = function (password) {
  return hashPassword.call(this, password);
};
user_schema.methods.comparePassword = function (password) {
  return comparePassword.call(this, password);
};
user_schema.methods.generate_Access_Token = function () {
  return generateAccessToken.call(this);
};
user_schema.methods.generate_Refresh_Token = function () {
  return generateRefreshToken.call(this);
};
user_schema.methods.hashing_OTP = function (otp) {
  return hash_OTP.call(this, otp);
};
user_schema.methods.compareOtp = function (otp) {
  return compareOtp.call(this, otp);
};

const User = mongoose.model("User", user_schema);
module.exports = User;
