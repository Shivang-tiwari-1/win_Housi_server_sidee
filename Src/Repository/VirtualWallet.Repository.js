const Virtual_Wallet = require("../Models/Virtual.Model");

exports.create_wallet_virtual = async (data) => {
  const create_wallet = await Virtual_Wallet.create({
    user_id: data.user_id,
    Balance: data.amount,
  });
  if (create_wallet) {
    return true;
  } else {
    return false;
  }
};
exports.update_wallet_virtual = async (data) => {
    console.log(data)
  const updating = await Virtual_Wallet.findOneAndUpdate(
    { user_id: data?.user_id },
    {
      $inc: { Balance: data?.amount },
      $push: {
        transaction_history: {
          name: "HousieOrganization",
          amount: data?.amount,
          time: new Date(),
        },
      },
    },
    { new: true, runValidators: true }
  );
  if (updating) {
    return true;
  } else {
    return false;
  }
};
exports.find_virtual_wallet_by_user_id = async (id) => {
  const find_id = await Virtual_Wallet.findOne({ user_id: id });
  if (find_id) {
    return true;
  } else {
    return false;
  }
};
