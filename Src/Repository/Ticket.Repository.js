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

exports.find_ticket = async (data) => {
  const finding = await Tickets.find({ user_id: data.user_id });
  if (finding) {
    return finding[0];
  } else {
    return false;
  }
};
