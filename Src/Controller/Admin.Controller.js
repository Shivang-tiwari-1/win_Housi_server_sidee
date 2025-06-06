const {
  automatic_contest_logic,
  start_contest_logic,
  delete_contest_logic,
} = require("../Services/Admin.Service");
const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const ApiResponse = require("../Utils/NewApiResponse");
const { response } = require("../Utils/response.Utils");

//create_contest_manually
//1.number_of_contestants,prize,ticket_prize,contest_pattern_claim destructure these properties form the body
//2.create the contest

//start_contest
//1.get the contest id
//2.look for the contest_id
//3.update the contest-contest_state

//delete_contest
//1.get the contest id
//2.look for the contest_id
//3.delete the contest-contest_state

//extract_ticket_number
//1.get all the users form the internal ticket model
//2.look for the ticket using the user_id
//3.get the tickets of all the internal_users


exports.create_contest_manually = asyncHandler(async (req, res) => {
  const {
    number_of_contestants,
    prize,
    ticket_prize,
    contest_pattern_claim,
    participants,
  } = req.body;
  if (
    number_of_contestants &&
    prize &&
    ticket_prize &&
    contest_pattern_claim &&
    participants
  ) {
    console.log("test1->passed");
  } else {
    console.log("test1->failed");
    return response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const creating = await create_contest_manually_logic(
    req.admin.id,
    number_of_contestants,
    prize,
    ticket_prize,
    contest_pattern_claim,
    participants
  );
  if (creating.success) {
    return response(200, "contest created", creating.data, res);
  } else {
    return response(400, creating.message, null, res);
  }
});

exports.start_contest = asyncHandler(async (req, res) => {
  const { contest_id } = req.query;
  if (contest_id) {
    console.log("test1->passed");
  } else {
    return response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const startig = await start_contest_logic(contest_id);
  if (creating.success) {
    return response(200, "contest created", startig.data, res);
  } else {
    return response(400, startig.message, null, res);
  }
});

exports.delete_contest = asyncHandler(async (req, res) => {
  const { contest_id } = req.query;
  if (contest_id) {
    console.log("test1->passed");
  } else {
    return response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const deleting = await delete_contest_logic(contest_id);
  if (creating.success) {
    return response(200, "contest created", deleting.data, res);
  } else {
    return response(400, deleting.message, null, res);
  }
});

exports.extract_ticket_number = asyncHandler(async (req, res) => {});
