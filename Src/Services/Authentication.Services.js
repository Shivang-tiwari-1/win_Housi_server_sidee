const { default: mongoose } = require("mongoose");
const { GenerateOtp } = require("../Controller/User.Controller");
const {
  createUser,
  find_user_by_phone,
  delete_Otp,
  find_user_by_email,
} = require("../Repository/User.Repository");
const ApiError = require("../Utils/ApiError.Utils");
const { generateOtp } = require("../Utils/OtpGeneration.Utils");
const { sendSMS } = require("../Utils/Sendotp.Utils");

exports.create_user_logic = async (user_Data) => {
  const check_if_exists = await find_user_by_email(user_Data?.email);
  if (!check_if_exists) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    throw new ApiError(409, "user already exists ");
  }

  const user = await createUser(user_Data);
  if (user) {
    console.log("test3->passed");
    return true;
  } else {
    console.log("test3->failed");
    return false;
  }
};
exports.generate_otp_logic = async (phone) => {
  const user = await find_user_by_phone(phone);
  if (user) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    throw new ApiError(400, "could not find the user");
  }

  const otp = await generateOtp();
  if (otp) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    throw new ApiError(400, "could not create otp");
  }

  const hashOtp = await user.hashing_OTP(otp);
  if (hashOtp) {
    console.log(user);
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return res.status(500).json({ error: "could not hash the OTP" });
  }

  const send_otp = await sendSMS(String(user.phone), otp);
  if (send_otp) {
    console.log("test5->passed");
    return true;
  } else {
    console.log("test5->failed");
    return false;
  }
};
exports.login_logic = async (phone, otp) => {
  const user = await find_user_by_phone(phone);
  if (user) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return false;
  }

  const otpCompare = await user.compareOtp(otp);
  if (otpCompare) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return false;
  }
  const deleteOtp = await delete_Otp(user);
  if (deleteOtp) {
    console.log("test5->success");
    return {
      success: true,
      user: user,
    };
  } else {
    console.log("test-5-> failed");
    return false;
  }
};
