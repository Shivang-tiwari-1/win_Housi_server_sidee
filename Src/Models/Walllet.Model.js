const mongoose = require("mongoose");

const Wallet_Schema = new mongoose.Schema(
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
    ticket_history: [
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
          required: true,
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

const Wallet = mongoose.model("Wallet", Wallet_Schema);
module.exports = Wallet;
