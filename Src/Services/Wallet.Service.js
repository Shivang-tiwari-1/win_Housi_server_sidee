const { default: mongoose } = require("mongoose");
const { razorpay } = require("../Constants");
const {
  find_wallet_with_find,
  update_wallet,
} = require("../Repository/Wallet.Repository");
const { find_user_by_id } = require("../Repository/User.Repository");

exports.create_request_logic = async (amount, phone) => {
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${new Date().getTime()}`,
    payment_capture: 1,
    notes: {
      phone: phone,
    },
  });
  if (order.status === "created") {
    return {
      success: true,
      data: order,
    };
  } else {
    return {
      success: false,
      message: "could not create the oder",
    };
  }
};

exports.add_money_logic = async (amount, user_id) => {
  console.log(amount, user_id);
  const user = await find_user_by_id(user_id);
  if (user) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    return {
      success: false,
      message: "could not find the user",
    };
  }

  const wallet_exists = await find_wallet_with_find(user_id);
  if (wallet_exists) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "could not find the wallet",
    };
  }

  const updatee_wallet = await update_wallet({
    id: wallet_exists?._id?.toString(),
    amount: amount,
    name: user?.name,
  });
  if (updatee_wallet) {
    console.log("test4->passed");
    return {
      success: true,
      data: updatee_wallet,
    };
  } else {
    console.log("test4->failed");
    return {
      success: false,
      message: "could not update the wallet",
    };
  }
};

exports.fetch_wallet_logic = async (user_id) => {
  const fetching = await find_wallet_with_find(user_id);
  if (fetching) {
    return {
      success: true,
      data: fetching,
    };
  } else {
    return {
      success: false,
      message: "could not fetch the wallet",
    };
  }
};
