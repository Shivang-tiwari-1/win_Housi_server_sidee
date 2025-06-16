const mongoose = require("mongoose");
const {
  generateRefreshToken,
  generateAccessToken,
  comparePassword,
  hashPassword,
  hash_OTP,
  compareOtp,
} = require("../Utils/Auth.Utils");

const internal_user_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    profileImage: { type: String },
    refreshToken: { type: String },
    otp: { type: String },
    history: [{ day_time_date: { type: String }, contestId: { type: String } }],
    in_game: [
      {
        type: Boolean,
        default: false,
      },
    ],
    role: {
      type: String,
      enum: ["internal_user"],
      default: "internal_user",
    },
  },
  { timestamps: true }
);

internal_user_schema.methods.hashPassword = function (password) {
  return hashPassword.call(this, password);
};
internal_user_schema.methods.comparePassword = function (password) {
  return comparePassword.call(this, password);
};
internal_user_schema.methods.generate_Access_Token = function () {
  return generateAccessToken.call(this);
};
internal_user_schema.methods.generate_Refresh_Token = function () {
  return generateRefreshToken.call(this);
};
internal_user_schema.methods.hashing_OTP = function (otp) {
  return hash_OTP.call(this, otp);
};
internal_user_schema.methods.compareOtp = function (otp) {
  return compareOtp.call(this, otp);
};

const PlantedUsers = mongoose.model("Scam", internal_user_schema);
module.exports = PlantedUsers;
