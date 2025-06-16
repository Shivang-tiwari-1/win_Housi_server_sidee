const { default: mongoose } = require("mongoose");
const { GenerateOtp } = require("../Controller/User.Controller");
const {
  createUser,
  find_user_by_phone,
  delete_Otp,
  find_user_by_email,
  look_up_in_all_collections_phone,
  look_up_in_all_collections_phone_email,
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
const { createPlantedUser } = require("../Repository/Plantes.Repository");
const { createAdminUser } = require("../Repository/Admin.Repository");

exports.create_user_logic = async (user_Data) => {
  const check_if_exists = await look_up_in_all_collections_phone_email({
    email: user_Data?.email,
  });
  console.log(check_if_exists);
  if (!check_if_exists.length) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      data: null,
      message: "User already exists",
    };
  }

  let user;
  if (user_Data.name.toLowerCase().includes("p")) {
    user = await createPlantedUser(user_Data);
    if (user) {
      console.log("test5->passed");
    } else {
      console.log("test5->failed");
      return {
        success: false,
        data: null,
        message: "error occurred please try again",
      };
    }
  } else if (user_Data.name.toLowerCase().includes("a")) {
    user = await createAdminUser(user_Data);
    if (user) {
      console.log("test5->passed");
    } else {
      console.log("test5->failed");
      return {
        success: false,
        data: null,
        message: "error occurred please try again",
      };
    }
  } else {
    user = await createUser(user_Data);
    if (user) {
      console.log("test5->passed");
    } else {
      console.log("test5->failed");
      return {
        success: false,
        data: null,
        message: "error occurred please try again",
      };
    }
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
        data: null,
        message: "error occurred",
      };
    }
  } else {
    return {
      success: true,
      data: user,
    };
  }
};

exports.generate_otp_logic = async (phone) => {
  const user = await look_up_in_all_collections_phone_email({ phone: phone });
  if (user) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    return {
      success: false,
      message: "User does not exist",
    };
  }

  const otp = await generateOtp();
  if (otp) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return {
      success: false,
      data: null,
      message: "error occurred please try again",
    };
  }
  console.log(otp);

  const hashOtp = await user?.data?.hashing_OTP(otp);
  if (hashOtp) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      data: null,
      message: "error occurred please try again",
    };
  }

  const send_otp = await sendSMS(String(user?.data?.phone), otp);
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
      data: null,
      message: "error occurred please try again",
    };
  }
};

exports.login_logic = async (phone, otp) => {
  const user = await look_up_in_all_collections_phone_email({ phone: phone });
  if (user) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "user does not exist",
    };
  }

  if (user?.role !== "admin") {
    const wallet_exists = await find_wallet_by_user_id(user?.data?._id);
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
      user?.data?._id
    );
    if (!virtual_wallet_exists) {
      const Virtual_wallet = await create_wallet_virtual({
        user_id: user?.data?.id,
        amount: 0,
      });
      if (!Virtual_wallet) {
      } else {
        return {
          success: false,
          message: "error occurred please try again",
        };
      }
    }
  }

  const otpCompare = await user.data?.compareOtp(otp);
  if (otpCompare) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      message: "Invalid otp",
    };
  }

  const deleteOtp = await delete_Otp(user?.data);
  if (deleteOtp) {
    console.log("test5->success");
    return {
      success: true,
      user: user?.data,
    };
  } else {
    console.log("test-5-> failed");
    return {
      success: true,
      data: "server error occurred",
    };
  }
};
