const mongoose = require("mongoose");

const Internal_ticket_Schema = new mongoose.Schema(
  {
    internal_userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scam",
      required: true,
    },
    tickets: [
      {
        contestID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Contest",
          require: true,
        },
        ticket: [
          {
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
        ],
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

const Tickets = mongoose.model("Tickets", Internal_ticket_Schema);
module.exports = Tickets;
