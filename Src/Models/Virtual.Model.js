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
const Virtual_Wallet = mongoose.model("Virtual_Wallet", Virtual_Wallet_Schema);
module.exports = Virtual_Wallet;
