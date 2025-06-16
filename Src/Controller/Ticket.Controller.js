const { default: mongoose } = require("mongoose");
const { fetch_ticket_logic } = require("../Services/Ticket.Services");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");

exports.fetch_ticket = asyncHandler(async (req, res) => {
  const fetching = await fetch_ticket_logic(
    new mongoose.Types.ObjectId(req.user?.id)
  );
  if (fetching.success) {
    return response(200, "data fetched", fetching?.data, res);
  } else {
    return response(400, "could not fetch the data ", fetching?.message, res);
  }
});
