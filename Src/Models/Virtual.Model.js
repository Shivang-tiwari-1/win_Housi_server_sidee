const mongoose = require("mongoose");

const Virtual_Wallet_Schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Balance: {
      type: Number,
      default: 0,
    },
    transaction_history: [
      {
        transaction_type: {
          type: String,
          enum: ["credit", "debit"],
          default: "debit",
          required: true,
        },
        contest_id: {
          type: mongoose.Types.ObjectId,
          ref: "Contest",
        },
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        time: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

Virtual_Wallet_Schema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update?.$set?.Balance !== undefined && update.$set.Balance < 0) {
    update.$set.Balance = 0;
  }

  if (update?.$inc?.Balance !== undefined && update.$inc.Balance < 0) {
    update.$inc.Balance = 0;
  }

  next();
});

const Virtual_Wallet = mongoose.model("Virtual_Wallet", Virtual_Wallet_Schema);
module.exports = Virtual_Wallet;
