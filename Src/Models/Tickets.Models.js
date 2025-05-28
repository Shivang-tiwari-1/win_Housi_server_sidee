const mongoose = require("mongoose");

const ticket_Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tickets: [
      {
        ticket: {
          contestID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
            require: true,
          },
          Array_: { type: Array, unique: true, required: true },
          ticket_pattern: [
            {
              pattern: {
                type: String,
                required: true,
              },
              pattern_array: {
                type: Array,
                required: true,
              },
            },
          ],
        },
        AmountPaid: { type: Number, required: true },
        status: {
          type: String,
          enum: ["active", "used", "cancelled"],
          default: "active",
        },
      },
    ],
  },
  { timestamps: true }
);

const Tickets = mongoose.model("Tickets", ticket_Schema);
module.exports = Tickets;
