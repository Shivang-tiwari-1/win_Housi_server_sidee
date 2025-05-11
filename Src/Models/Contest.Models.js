const mongoose = require("mongoose");

const Contest_schema = new mongoose.Schema(
  {
    contest_participants: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Contest = mongoose.model("Contest", Contest_schema);
module.exports = Contest;
