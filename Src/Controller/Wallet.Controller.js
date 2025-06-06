
const { razorpay } = require("../Constants");
const {
  create_request_logic,
  add_money_logic,
  fetch_wallet_logic,
} = require("../Services/Wallet.Service");
const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");

exports.create_request = asyncHandler(async (req, res) => {
  const { amount, phone } = req.body;
  if (!amount || !phone) {
    throw new ApiError(400, "data missing");
  } else if (Number(amount) < 100) {
    response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const processign_request = await create_request_logic(amount, phone);
  if (processign_request.success) {
    response(200, "request created", processign_request.data, res);
  } else {
    response(400, processign_request.message, null, res);
  }
});

exports.add_money = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  if (amount) {
    console.log("tets 1->passed", amount);
  } else {
    console.log("test1->failed");
    response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const adding_money = await add_money_logic(amount, req.user.id);
  if (adding_money.success) {
    response(200, "money_added", adding_money.data, res);
  } else {
    response(400, adding_money.message, null, res);
  }
});

exports.fetch_wallet = asyncHandler(async (req, res) => {
  const fetching = await fetch_wallet_logic(req.user.id);
  if (fetching.success) {
    response(200, "wallet fetched", fetching.data, res);
  } else {
    response(400, fetching.message, null, res);
  }
});
