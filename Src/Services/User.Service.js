const { default: mongoose } = require("mongoose");
const {
  update_contest_participants,
  fetch_contest_by_id,
} = require("../Repository/Contest.Repository");
const {
  find_ticket,
  create_ticket,
} = require("../Repository/Ticket.Repository");
const { update_in_game_status } = require("../Repository/User.Repository");
const {
  find_wallet_with_find,
  decrement_amount,
} = require("../Repository/Wallet.Repository");
const { return_Grid } = require("../Data_processing/generateTicket");
const {
  pattern_processing,
} = require("../Data_processing/pattern_processing.Data_processing");

exports.buy_ticket_logic = async (contestID, ticket_prize, user_id) => {
  let collect_patterns = [];
  const find_wallet = await find_wallet_with_find(user_id);
  if (find_wallet) {
    console.log("test2->passed");
  } else if (find_wallet.Balance > ticket_prize) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    return { success: false, message: "wallet could not find the wallet" };
  }
  //2
  const genrate_ticket_numbers = await return_Grid();
  if (genrate_ticket_numbers.success) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    return {
      success: false,
      message: "could not generate the ticket",
    };
  }
  //3
  const if_contest_exist = await fetch_contest_by_id({
    contest_id: contestID,
  });
  if (if_contest_exist !== null) {
    console.log("test3->passed");
  } else if (
    if_contest_exist.contest_participants.length === number_of_contestants
  ) {
    return {
      success: true,
      data: "maximum amount of participants reached",
    };
  } else if (if_contest_exist.contest_state === "closed") {
    return {
      success: true,
      data: "contest has been closed",
    };
  } else if (if_contest_exist.contest_state === "ended") {
    return {
      success: true,
      data: "contest has ended",
    };
  } else if (if_contest_exist.contest_state === "started") {
    return {
      success: true,
      data: "contest has already started",
    };
  } else {
    console.log("test3->failed");
    return {
      success: false,
      data: "could not fetch the contest",
    };
  }
  //4
  const { contest_pattern_claim } = if_contest_exist;
  if (contest_pattern_claim || contest_pattern_claim.length > 0) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      message: "could not destructure the field",
    };
  }
  console.log(if_contest_exist);
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

      console.log(collect_patterns);
    })
  );

  const create_Ticket = await create_ticket({
    userId: user_id,
    contestID: new mongoose.Types.ObjectId(contestID),
    matrix: genrate_ticket_numbers.grid,
    ticket_pattern: collect_patterns,
    AmountPaid: if_contest_exist?.ticket_prize,
  });
  if (create_Ticket) {
    console.log("test6->passed");
  } else {
    console.log("test6->failed");

    return {
      success: false,
      message: "could not create the ticket",
    };
  }

  //8.
  const wallet_update = await decrement_amount({
    user_id: new mongoose.Types.ObjectId(user_id),
    amount:
      if_contest_exist?.ticket_prize === 0
        ? 0
        : -if_contest_exist?.ticket_prize,
    contest_id: new mongoose.Types.ObjectId(contestID),
  });
  if (wallet_update) {
    console.log("test7->passed");
    return {
      success: true,
      data: wallet_update,
    };
  } else {
    console.log("test7->failed");
    return {
      success: false,
      message: "could not decrement the amount",
    };
  }
};

exports.join_contest_logic = async (user_id) => {
  //1.
  const finding_ticket = await find_ticket({ user_id: user_id });
  if (finding_ticket) {
    console.log("test1->passed");
  } else {
    return {
      success: true,
      message: "could nto find the ticket",
    };
  }
  //2.
  const fetching_contest = await fetch_contest_by_id({
    contest_id: finding_ticket?.contestID,
  });
  if (fetching_contest) {
    console.log("test2->passed");
  } else {
    return {
      success: false,
      message: "could not fetch the contests ",
    };
  }
  //3.
  const update_contest_Participants = await update_contest_participants({
    contest_id: fetching_contest?._id,
    user_id: new mongoose.Types.ObjectId(req.user?.id),
    participant_ticket: finding_ticket?._id,
  });
  if (update_contest_Participants) {
    console.log("test7->passed");
  } else {
    console.log("test7->failed");
    return {
      success: false,
      message: "could not update the participants",
    };
  }
  //4.
  const update_in_game = await update_in_game_status({
    id: user_id,
  });
  if (update_in_game) {
    console.log("test4->passed");
    return {
      success: true,
      data: finding_ticket,
    };
  } else {
    console.log("test4->failed");
    return {
      success: true,
      message: "could not update",
    };
  }
};
