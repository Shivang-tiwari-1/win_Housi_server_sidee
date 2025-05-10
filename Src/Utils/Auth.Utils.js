const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  this.password = hash;
  return this.save();
};
exports.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
exports.generateAccessToken = async function () {
  return jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.GENERATE_TOKEN_SECRET,
    { expiresIn: process.env.GENERATE_TOKEN_EXPIERY }
  );
};
exports.generateRefreshToken = async function () {
  return jwt.sign(
    {
      id: this.id,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIERY }
  );
};
exports.hash_OTP = async function (otp) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(otp, salt);
  otp = hash;
  this.otp = otp;
  return this.save();
};
exports.compareOtp = async function (otp) {
  console.log(otp, this);
  const compare = await bcrypt.compare(otp, this.otp);
  console.log(compare);
  return compare;
};
