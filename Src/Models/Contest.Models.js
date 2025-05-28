const mongoose = require("mongoose");

const Contest_schema = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    number_of_contestants: {
      type: Number,
      enum: [250, 4000, 30, 2000, 50, 20, 15, 10000, 100, 100000],
      default: null,
      required: true,
    },
    prize: {
      type: Number,
      enum: [
        250, 150000, 100000, 950, 38000, 31000, 110000, 139000, 1100, 340000,
        145000, 270000, 3400000,
      ],
      default: null,
      required: true,
    },
    ticket_prize: {
      type: Number,
      enum: [0, 50, 5000, 30, 1000, 10000, 25000, 20, 49],
      default: null,
      required: true,
    },
    contest_participants: [
      {
        participant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        participant_ticket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ticket",
          required: true,
        },
      },
    ],
    contest_pattern_claim: {
      type: Array,
      required: true,
      default: [],
    },
    contest_state: {
      type: String,
      enum: ["started", "pending", "closed", "ended"],
      default: "closed",
    },
    Full_housie_winner: {
      type: String,
    },
  },
  { timestamps: true }
);

const Contest = mongoose.model("Contest", Contest_schema);
module.exports = Contest;
