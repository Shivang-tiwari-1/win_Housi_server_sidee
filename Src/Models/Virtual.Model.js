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
    
  },
  { timestamps: true }
);
