const { default: mongoose } = require("mongoose");
const { return_Grid } = require("../Data_processing/generateTicket");
const {
  pattern_processing,
} = require("../Data_processing/pattern_processing.Data_processing");
const Tickets = require("../Models/Tickets.Models");
const {
  fetch_contest_by_id,
  update_contest_participants,
} = require("../Repository/Contest.Repository");
const { create_ticket } = require("../Repository/Ticket.Repository");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");
const {
  update_wallet,
  decrement_amount,
  find_wallet_with_find,
} = require("../Repository/Wallet.Repository");

exports.buyTicket = asyncHandler(async (req, res) => {
  //1.body->contestID as a param
  //2.generate the unique ticket numbers--array will be a 2d array [[][][]] to maintain the oder of numbers-(in places where numbers are not there those places in the matrix will be marked with null)
  //3.look for the contest using contestId
  //4.check how many pattern claims are there
  //5.find the ticket that belongs to the contest
  //5.now process the ticket for its pattern and store them-(ticket)-ticket_Schema
  //6.save the ticket
  //7.update the contest participants-(contest_participants)-Contest_schema
  //8.deduct the money from the wallet-(Balance)-Wallet_schema

  let collect_patterns = [];
  //1
  const { contestID, ticket_prize } = req.query;
  if (contestID) {
    console.log("test1->passed");
  } else {
    console.log("test1->failed");
    response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const find_wallet = await find_wallet_with_find(req?.user?.id);
  if (find_wallet) {
    console.log("test2->passed");
  } else if (find_wallet.Balance < ticket_prize) {
    console.log("test2->passed");
    response(200, "you don`t have enough balance ", null, res);
  } else {
    console.log("test2->failed");
    response(
      404,
      "Not Found → Resource doesn’t exist (wrong URL or ID).",
      null,
      res
    );
  }
  //2
  const genrate_ticket_numbers = await return_Grid();
  if (genrate_ticket_numbers.success) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    response(400, genrate_ticket_numbers.message, null, res);
  }
  //3
  const if_contest_exist = await fetch_contest_by_id({ contest_id: contestID });
  if (if_contest_exist !== null) {
    console.log("test3->passed");
  } else if (
    if_contest_exist.contest_participants.length === number_of_contestants
  ) {
    response(200, "maximum amount of participants reached", null, res);
  } else if (if_contest_exist.contest_state === "closed") {
    response(200, "contest has been closed", null, res);
  } else if (if_contest_exist.contest_state === "ended") {
    response(200, "contest has ended", null, res);
  } else if (if_contest_exist.contest_state === "started") {
    response(200, "contest has already started", null, res);
  } else {
    console.log("test3->failed");
    response(
      404,
      "Not Found → Resource doesn’t exist (wrong URL or ID).",
      null,
      res
    );
  }
  //4
  const { contest_pattern_claim } = if_contest_exist;
  if (contest_pattern_claim || contest_pattern_claim.length > 0) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    response(404, "Not Found → Resource doesn’t exist.", null, res);
  }
  //5.
  await Promise.all(
    contest_pattern_claim.map((item) => {
      const patterns = pattern_processing({
        pattern: item?.pattern,
        array: genrate_ticket_numbers,
      });

      if (
        !collect_patterns.includes({ prize: item.pattern, pattern: patterns })
      ) {
        collect_patterns.push({
          pattern: item?.pattern,
          array: patterns,
        });
      }
    })
  );
  //6.
  const create_Ticket = await create_ticket({
    userId: req?.user?.id,
    contestID: new mongoose.Types.ObjectId(contestID),
    matrix: genrate_ticket_numbers.grid,
    ticket_pattern: collect_patterns,
    AmountPaid: if_contest_exist?.ticket_prize,
  });
  if (create_Ticket) {
    console.log("test6->passed");
  } else {
    console.log("test6->failed");

    response(
      404,
      "Not Found → Resource doesn’t exist (wrong URL or ID).",
      null,
      res
    );
  }
  //7.
  const update_contest_Participants = await update_contest_participants({
    contest_id: contestID,
    user_id: req.user?.id,
    participant_ticket: create_Ticket?.id,
  });
  if (update_contest_Participants) {
    console.log("test7->passed");
  } else {
    console.log("test7->failed");
    response(
      404,
      "Not Found → Resource doesn’t exist (wrong URL or ID).",
      null,
      res
    );
  }

  //8.
  const wallet_update = await decrement_amount({
    user_id: new mongoose.Types.ObjectId(req?.user?.id),
    amount:
      if_contest_exist?.ticket_prize === 0
        ? 0
        : -if_contest_exist?.ticket_prize,
    contest_id: new mongoose.Types.ObjectId(contestID),
  });
  if (wallet_update) {
    console.log("test8->passed");
    return res.status(200).json({
      success: true,
    });
  } else {
    console.log("test8->failed");
    response(
      404,
      "Not Found → Resource doesn’t exist (wrong URL or ID).",
      null,
      res
    );
  }
});

exports.join_contest = asyncHandler(async (req, res) => {
  //1.using user_id look for his or her ticket-ticket_Schema
  //2.using the contest_id from the the ticket model look for the contest-(tickets:{contestID})
  //3.update the contest-(contest_participants)-Contest_schema
  //4.update the user model-(in_game)-user_schema
  //5.send the unique tickets to the client Side
});

exports.claim_patterns = asyncHandler(async (req, res) => {
  //1.destructure the array of numbers,pattern_name,ticket_id from the body
  //2.look for the ticket-ticket_schema
  //3.look for the contest if that contest supports the pattern and  also the winning prize
  //4.send the array-of object along with the ticket pattern for processing
  //5.update the contest_schema-(contest_participants)-contest_schema
  //6.reflect the winning prize in the virtual balance
});

exports.transactionException = asyncHandler(async (req, res) => {});
