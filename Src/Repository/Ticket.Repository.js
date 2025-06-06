const Tickets = require("../Models/Tickets.Models");

exports.create_ticket = async (data) => {
  console.log(data);
  return await Tickets.create({
    userId: data.userId,
    tickets: [
      {
        ticket: {
          contestID: data.contestID,
          Array_: data.matrix,
          ticket_pattern: data.ticket_pattern.map((item) => ({
            pattern: item.pattern,
            pattern_array: item.array,
          })),
        },

        AmountPaid: data.AmountPaid,
      },
    ],
  });
};

exports.update_ticket = async (data) => {
  const update = await Tickets.findOneAndUpdate(
    { userId: data.userId },
    {
      $push: {
        tickets: {
          ticket: {
            contestID: data.contestID,
            Array_: data.matrix,
            ticket_pattern: data.ticket_pattern.map((item) => ({
              pattern: item.pattern,
              pattern_array: item.array,
            })),
          },
          AmountPaid: data.AmountPaid,
        },
      },
    },
    { new: true }
  );
  if (update) {
    return update;
  } else {
    return false;
  }
};

exports.find_ticket = async (data) => {
  const finding = await Tickets.find({ user_id: data.user_id });
  if (finding) {
    return finding[0];
  } else {
    return false;
  }
};

exports.find_ticket_by_id = async (data) => {
  console.log(data)
  const finding = await Tickets.findById(data.ticket_id);
  if (finding) {
    return finding;
  } else {
    return false;
  }
};

exports.find_using_more_cred = async (data) => {
  console.log("-----------.>", data);
  const finding = await Tickets.find({
    userId: data.userId,
    "tickets.ticket.contestID": data.contestID, // <--- key fix
  });
  if (finding) {
    return finding;
  } else {
    return false;
  }
};
