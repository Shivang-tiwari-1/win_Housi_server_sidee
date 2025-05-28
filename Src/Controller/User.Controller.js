const { return_Grid } = require("../Data_processing/generateTicket");
const {
  pattern_processing,
} = require("../Data_processing/pattern_processing.Data_processing");
const Tickets = require("../Models/Tickets.Models");
const { fetch_contest_by_id } = require("../Repository/Contest.Repository");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");

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
  //9.update the transaction-(ticket_history)-Wallet_schema
  //10.update the user-(in_game)-user_schema
  let collect_patterns = [];
  //1
  const { contestID } = req.query;
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
  if (if_contest_exist) {
    console.log("test3->passed");
  } else {
    console.log("test3->passed");
    response(
      404,
      "Not Found → Resource doesn’t exist (wrong URL or ID).",
      null,
      res
    );
  }
  //4
  const { contest_pattern_claim } = if_contest_exist;
  if (contest_pattern_claim) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    response(404, "Not Found → Resource doesn’t exist.", null, res);
  }
  //5.
  await Promise.all(
    contest_pattern_claim.map((item) => {
      const patterns = pattern_processing({
        pattern: item.pattern,
        array: genrate_ticket_numbers,
      });

      if (!collect_patterns.includes({ prize: item.pattern, pattern: patterns })) {
        collect_patterns.push({
          prize: item.pattern,
          pattern: patterns,
        });
      }
    })
  );

  console.log(collect_patterns,contest_pattern_claim)
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
