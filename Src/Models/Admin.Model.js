const mongoose = require("mongoose");
const {
  generateRefreshToken,
  generateAccessToken,
  comparePassword,
  hashPassword,
} = require("../Utils/Auth.Utils");

const Admin_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    profileImage: { type: String, unique: true },
    address: { type: String, required: true },
    coordinates: {
      type: [Number],
      index: "2dsphere",
      required: true,
    },
    refreshToken: {
      type: String,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

Admin_schema.methods.hashPassword = function (password) {
  return hashPassword.call(this, password);
};

Admin_schema.methods.comparePassword = function (password) {
  return comparePassword.call(this, password);
};

Admin_schema.methods.generateAccessToken = function () {
  return generateAccessToken.call(this);
};

Admin_schema.methods.generateRefreshToken = function () {
  return generateRefreshToken.call(this);
};

const Admin = mongoose.model("Admin", Admin_schema);
module.exports = Admin;
