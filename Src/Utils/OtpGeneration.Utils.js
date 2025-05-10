exports.generateOtp = async () => {
  let otp = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    otp = otp + randomVal;
  }
  return otp;
};
