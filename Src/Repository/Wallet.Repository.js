const Wallet = require("../Models/Walllet.Model");

exports.create_wallet = async (data) => {
  const create_wallet = await Wallet.create({
    user_id: data.user_id,
    Balance: data.amount,
  });
  if (create_wallet) {
    return true;
  } else {
    return false;
  }
};

exports.find_wallet = async (id) => {
  const finding = await Wallet.findById(id);
  console.log();
  if (finding) {
    return finding;
  } else {
    return false;
  }
};

exports.find_wallet_with_find = async (id) => {
  const finding = await Wallet.find({ user_id: id });
  if (finding) {
    return finding[0];
  } else {
    return false;
  }
};

exports.update_wallet = async (data) => {
  const updating = await Wallet.findByIdAndUpdate(
    data.id,
    {
      $inc: { Balance: data.amount },
      $push: {
        transaction_history: {
          name: data.name,
          amount: data.amount,
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

exports.decrement_amount = async (data) => {
  const updating = await Wallet.findOneAndUpdate(
    { user_id: data.user_id },
    {
      $inc: { Balance: data.amount },
      $push: {
        ticket_history: {
          contest_id: data.contest_id,
          transaction_type: "credit",
          name: "winHousieOrganization",
          amount: data.amount,
          time: new Date(),
        },
      },
    },
    { new: true, runValidators: true }
  );
  console.log(updating);
  if (updating) {
    return true;
  } else {
    return false;
  }
};

exports.find_wallet_by_user_id = async (id) => {
  const find_id = await Wallet.findOne({ user_id: id });
  if (find_id) {
    return true;
  } else {
    return false;
  }
};

exports.update_transaction = async (data) => {
  const updating_transaction = await Wallet.findByIdAndUpdate(
    data.id,
    {
      $push: {
        transaction_history: {
          name: data.name,
          amount: data.amount,
          time: data.time,
        },
      },
    },
    {
      new: true,
    }
  );
  if (updating_transaction) {
    return true;
  } else {
    return false;
  }
};

exports.check_transaction = async (data) => {
  return (
    await Wallet.find(
      {
        transaction_history: {
          $elemMatch: {
            contest_id: data.contest_id,
            user_id: data.user_id,
          },
        },
      },
      {
        "transaction_history.$": 1,
      }
    )
  )[0];
};
