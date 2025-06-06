const { fetch_ticket_logic } = require("../Services/Ticket.Services");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");

exports.fetch_ticket = asyncHandler(async (req, res) => {
  const fetching = await fetch_ticket_logic(req.user?.id);
  if (fetching.success) {
    return response(200, "data fetched", fetch_ticket?.data, res);
  } else {
    return response(
      400,
      "could not fetch the data ",
      fetch_ticket?.message,
      res
    );
  }
});
