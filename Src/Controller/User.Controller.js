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
const {
  create_ticket,
  find_ticket,
} = require("../Repository/Ticket.Repository");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");
const {
  update_wallet,
  decrement_amount,
  find_wallet_with_find,
} = require("../Repository/Wallet.Repository");
const {
  buy_ticket_logic,
  join_contest_logic,
  claim_pattern_logic,
} = require("../Services/User.Service");

// buyTicket
//1.body->contestID and ticket_prize as a param
//2.generate the unique ticket numbers--array will be a 2d array [[][][]] to maintain the oder of numbers-(in places where numbers are not there those places in the matrix will be marked with null)
//3.look for the contest using contestId
//4.check how many pattern claims are there
//5.find the ticket that belongs to the contest
//6.now process the ticket for its pattern and store them-(ticket)-ticket_Schema
//7.save the ticket
//8.deduct the money from the wallet-(Balance)-Wallet_schema

//join_contest
//1.using user_id look for his or her ticket-ticket_Schema
//2.using the contest_id from the the ticket model look for the contest-(tickets:{contestID})
//3.check if user has already joined the contest
//4.update the contest-(contest_participants)-Contest_schema
//5.update the user model-(in_game)-user_schema
//6.send the unique tickets to the client Side

// claim_patterns
//1.destructure the array of numbers,pattern_name,ticket_id from the body
//2.look for the ticket-ticket_schema
//3.look for the contest if that contest supports the pattern and  also the winning prize
//4.send the array-of object along with the ticket pattern for processing
//5.update the contest_schema-(contest_participants)-contest_schema
//6.reflect the winning prize in the virtual balance

exports.buyTicket = asyncHandler(async (req, res) => {
  //1
  const { contestID, ticket_prize, number_of_times } = req.query;
  if (contestID && number_of_times > 0) {
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

  const buying_ticket = await buy_ticket_logic(
    contestID,
    ticket_prize,
    req.user.id,
    number_of_times
  );
  if (buying_ticket.success) {
    return response(
      200,
      buying_ticket?.data ?? "ticket bought",
      buying_ticket.data,
      res
    );
  } else {
    return response(400, buying_ticket.message, null, res);
  }
});

exports.join_contest = asyncHandler(async (req, res) => {
  const { ticket_id } = req.query;
  console.log(ticket_id);
  if (ticket_id) {
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
  const joining = await join_contest_logic(req.user.id, ticket_id);
  if (joining.success) {
    return response(200, "contest joined", joining.data, res);
  } else {
    return response(400, joining.message, null, res);
  }
});

exports.claim_patterns = asyncHandler(async (req, res) => {
  const { ticket_id, ticket_pattern_id } = req.query;
  const { arrr_data, pattern_name } = req.body;

  console.log(ticket_pattern_id, ticket_id, arrr_data, pattern_name);
  if (
    ticket_id &&
    ticket_pattern_id &&
    Array.isArray(arrr_data) &&
    pattern_name
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

  const claiming = await claim_pattern_logic(
    ticket_id,
    arrr_data,
    pattern_name,
    ticket_pattern_id,
    req.user.id
  );
  if (claiming.success) {
    return response(200, "contest joined", claiming.data, res);
  } else {
    return response(400, claiming.message, null, res);
  }
});

exports.transactionException = asyncHandler(async (req, res) => {});
