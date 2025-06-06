const { default: mongoose } = require("mongoose");
const { GenerateOtp } = require("../Controller/User.Controller");
const {
  createUser,
  find_user_by_phone,
  delete_Otp,
  find_user_by_email,
} = require("../Repository/User.Repository");
const { generateOtp } = require("../Utils/OtpGeneration.Utils");
const { sendSMS } = require("../Utils/Sendotp.Utils");
const {
  create_wallet,
  find_wallet_by_user_id,
} = require("../Repository/Wallet.Repository");
const {
  create_wallet_virtual,
  find_virtual_wallet_by_user_id,
} = require("../Repository/VirtualWallet.Repository");

exports.create_user_logic = async (user_Data) => {
  const check_if_exists = await find_user_by_email(user_Data?.email);
  if (!check_if_exists) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      message: "Not Found → Resource doesn’t exist (wrong URL or ID)",
    };
  }

  const user = await createUser(user_Data);
  if (user) {
    console.log("test5->passed");
  } else {
    console.log("test5->failed");
    return {
      success: false,
      message: "Not Found → Resource doesn’t exist (wrong URL or ID)",
    };
  }

  if (user?.role !== "admin" || user?.role === undefined) {
    const wallet = await create_wallet({
      user_id: user?.id,
      amount: 0,
    });
    const Virtual_wallet = await create_wallet_virtual({
      user_id: user?.id,
      amount: 0,
    });
    if (wallet && Virtual_wallet) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: "Not Found → Resource doesn’t exist (wrong URL or ID)",
      };
    }
  } else {
    return {
      success: true,
    };
  }
};

exports.generate_otp_logic = async (phone) => {
  const user = await find_user_by_phone(phone);
  if (user) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    return {
      success: false,
      message: "Not Found → Resource doesn’t exist (wrong URL or ID)",
    };
  }

  const otp = await generateOtp();
  if (otp) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "could not generate the otp",
    };
  }

  const hashOtp = await user.hashing_OTP(otp);
  if (hashOtp) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      message: "could nto complete the hash",
    };
  }

  const send_otp = await sendSMS(String(user.phone), otp);
  if (send_otp) {
    console.log("test5->passed");
    return {
      success: true,
      otp: otp,
    };
  } else {
    console.log("test5->failed");
    return {
      success: false,
      message: "could nto send the otp",
    };
  }
};

exports.login_logic = async (phone, otp) => {
  const user = await find_user_by_phone(phone);
  if (user) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "could not find the user",
    };
  }

  if (user?.role !== "admin" || user?.role === undefined) {
    const wallet_exists = await find_wallet_by_user_id(user?._id);
    if (!wallet_exists) {
      const wallet = await create_wallet({
        user_id: user?.id,
        amount: 0,
      });
      if (wallet) {
      } else {
        return {
          success: false,
          message: "could not create the wallet",
        };
      }
    }

    const virtual_wallet_exists = await find_virtual_wallet_by_user_id(
      user?._id
    );
    if (!virtual_wallet_exists) {
      const Virtual_wallet = await create_wallet_virtual({
        user_id: user?.id,
        amount: 0,
      });
      if (!Virtual_wallet) {
      } else {
        return {
          success: false,
          message: "could not create the wallet",
        };
      }
    }
  }

  const otpCompare = await user.compareOtp(otp);
  if (otpCompare) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      message: "wrong otp",
    };
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
    return {
      success: false,
      message: "could not delete the otp",
    };
  }
};
