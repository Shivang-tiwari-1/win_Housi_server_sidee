const { find_ticket } = require("../Repository/Ticket.Repository");

exports.fetch_ticket_logic = async (user_id) => {
  const get_allTicket = await find_ticket({ user_id: user_id });
  if (get_allTicket) {
    return {
      success: true,
      data: get_allTicket,
    };
  } else {
    return {
      success: false,
      message: "failed to fetch the tickets",
    };
  }
};
