import { fetch_contest_by_id } from "../Repository/Contest.Repository";
import { check_transaction } from "../Repository/Wallet.Repository";
import { asyncHandler } from "../Utils/AsyncHandler.Utils";
import { response } from "../Utils/response.Utils";

exports.payment_Check = asyncHandler(async (req, res, next) => {
  const { contest_id } = req.params;
  if (contest_id) {
    console.log("test1->passed");
  } else {
    console.log("test1->failed");
    response(
      400,
      "Bad Request → Invalid input, missing data, malformed request-(contest_id not found)",
      null,
      res
    );
  }

  const get_contest = await fetch_contest_by_id({ contest_id: contest_id });
  if (get_contest) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    response(
      404,
      "Not Found → Resource doesn't exist (wrong URL or ID)",
      null,
      res
    );
  }

  const check_payment = await check_transaction({
    contest_id: contest_id,
    user_id: req?.user?.id,
  });
  if (check_payment !== undefined || check_payment?.length !== 0) {
    console.log("test3->passed");
  } else if (get_contest?.ticket_prize === check_payment?.amount) {
    console.log("test3->(amount is paid)");
    next();
  } else {
    console.log("test3->failed");
    response(
      403,
      "Forbidden → Authenticated, but not allowed to access the resource-( amount not paid cannot see the transaction)",
      null,
      res
    );
  }

  next();
});
