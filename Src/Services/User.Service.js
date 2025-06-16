const { default: mongoose, Types } = require("mongoose");
const {
  update_contest_participants,
  fetch_contest_by_id,
  find_if_user_alrady_exist,
  find_ticket_array,
} = require("../Repository/Contest.Repository");
const {
  find_ticket,
  create_ticket,
  find_ticket_by_id,
  find_using_more_cred,
  update_ticket,
} = require("../Repository/Ticket.Repository");
const {
  update_in_game_status,
  update_user_History,
  contests_joined,
} = require("../Repository/User.Repository");
const {
  find_wallet_with_find,
  decrement_amount,
} = require("../Repository/Wallet.Repository");
const { return_Grid } = require("../Data_processing/generateTicket");
const {
  pattern_processing,
} = require("../Data_processing/pattern_processing.Data_processing");
const {
  update_wallet_virtual,
} = require("../Repository/VirtualWallet.Repository");

exports.buy_ticket_logic = async (
  contestID,
  ticket_prize,
  user_id,
  number_of_times
) => {
  //2
  const find_wallet = await find_wallet_with_find(user_id);
  if (find_wallet.Balance < ticket_prize) {
    console.log("test2->failed");
    return { success: false, message: "you do not have enough money" };
  } else if (!find_wallet) {
    console.log("test2->failed");
    return { success: false, message: "wallet could not find the wallet" };
  }
  //3
  const genrate_ticket_numbers = await return_Grid(Number(number_of_times));
  if (genrate_ticket_numbers.success) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    return {
      success: false,
      message: "could not generate the ticket",
    };
  }
  //4
  const if_contest_exist = await fetch_contest_by_id({
    contest_id: new mongoose.Types.ObjectId(contestID),
  });
  if (if_contest_exist) {
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
  //5
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
  //6.
  let create_Ticket;
  let updated_ticket;
  for (let i = 0; i <= genrate_ticket_numbers.grid.length - 1; i++) {
    let local_patterns = [];
    for (let item of contest_pattern_claim) {
      const patterns = pattern_processing({
        pattern: item?.pattern,
        array: genrate_ticket_numbers?.grid[ i ],
      });

      if (!local_patterns.some((p) => p.pattern === item.pattern)) {
        local_patterns.push({
          pattern: item?.pattern,
          array: patterns,
        });
      }
    }

    if (i === 0) {
      create_Ticket = await create_ticket({
        userId: user_id,
        contestID: new mongoose.Types.ObjectId(contestID),
        matrix: genrate_ticket_numbers?.grid[ i ],
        ticket_pattern: local_patterns,
        AmountPaid: if_contest_exist?.ticket_prize,
      });
      if (create_Ticket) {
        console.log("test6->(create)passed");
      } else {
        console.log("test6->(create)failed");
        return {
          success: false,
          message: "could not create the ticket",
        };
      }
      local_patterns = [];
    } else {
      updated_ticket = await update_ticket({
        userId: user_id,
        contestID: new mongoose.Types.ObjectId(contestID),
        matrix: genrate_ticket_numbers?.grid[ i ],
        ticket_pattern: local_patterns,
        AmountPaid: if_contest_exist?.ticket_prize,
      });

      if (updated_ticket) {
        console.log("test6->(update)passed");
      } else {
        console.log("test6->(update)failed");
        return {
          success: false,
          message: "could not update the ticket",
        };
      }
    }
  }

  //8
  const wallet_update = await decrement_amount({
    user_id: new mongoose.Types.ObjectId(user_id),
    amount: ticket_prize === 0 ? ticket_prize : ticket_prize * number_of_times,
    contest_id: new mongoose.Types.ObjectId(contestID),
  });
  if (wallet_update) {
    console.log("test7->passed");
    return {
      success: true,
      data: updated_ticket === undefined ? create_Ticket : updated_ticket,
    };
  } else {
    console.log("test7->failed");
    return {
      success: false,
      message: "could not decrement the amount",
    };
  }
};

exports.join_contest_logic = async (user_id, ticket_id) => {
  //1.
  const finding_ticket = await find_ticket_by_id({ ticket_id: ticket_id });
  console.log(finding_ticket);
  if (finding_ticket) {
    console.log("test2->passed");
  } else {
    console.log("test2->failed");
    return {
      success: false,
      message: "could not find the ticket",
    };
  }
  //2.
  const fetching_contest = await fetch_contest_by_id({
    contest_id: finding_ticket.tickets[ 0 ].ticket.contestID,
  });
  if (fetching_contest) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "could not fetch the contests ",
    };
  }
  //3
  const find_if_user_alrady_exists = await find_if_user_alrady_exist({
    fetching_contest: fetching_contest._id,
    user_id: user_id,
    finding_ticket: finding_ticket?._id,
  });
  if (
    find_if_user_alrady_exists.contest_participants?.some(
      (data) =>
        data.participant.toString() === user_id &&
        data.participant_ticket.toString() === finding_ticket?.id
    ) ||
    find_if_user_alrady_exists
  ) {
    return {
      success: true,
      data: " you have already joined",
    };
  }
  //4.
  const update_contest_Participants = await update_contest_participants({
    contest_id: fetching_contest?._id,
    user_id: new mongoose.Types.ObjectId(user_id),
    participant_ticket: finding_ticket?._id,
  });
  if (update_contest_Participants) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
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
    console.log("test5->passed");
  } else {
    console.log("test5->failed");
    return {
      success: false,
      message: "could not update",
    };
  }
  //5.
  const update_user_history = await update_user_History({
    fetching_contest: fetching_contest._id,
    user_id: user_id,
  });
  if (update_user_history) {
    console.log("test5->passed");
    return {
      success: true,
      data: finding_ticket,
    };
  } else {
    console.log("test5->failed");
    return {
      success: false,
      message: "could not update",
    };
  }
};

exports.claim_pattern_logic = async (
  ticket_id,
  arrr_data,
  pattern_name,
  ticket_pattern_id,
  user_id
) => {
  //2
  const finding_ticket = await find_ticket_by_id({ ticket_id: ticket_id });
  if (finding_ticket) {
    console.log("test2->passed");
  } else {
    console.log("test2->passed");
    return {
      success: true,
      message: "could nto find the ticket",
    };
  }
  //3
  const fetching_contest = await fetch_contest_by_id({
    contest_id: finding_ticket.tickets[ 0 ].ticket.contestID,
  });
  if (fetching_contest) {
    console.log("test3->passed");
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "could not fetch the contests ",
    };
  }
  //4
  const { contest_pattern_claim } = fetching_contest;
  if (contest_pattern_claim) {
    console.log("test4->passed");
  } else {
    console.log("test4->failed");
    return {
      success: false,
      message: "could not find the patterns in the contests ",
    };
  }
  //5
  const pattern = contest_pattern_claim.find((data) => {
    return data.pattern?.toLowerCase() === pattern_name.toLowerCase();
  });

  if (pattern?.claimed === true) {
    return {
      success: false,
      message: "pattern has already been claimed"
    }
  }
  else if (pattern !== undefined) { 
    pattern?.no_of_winners > 1 ? pattern?.no_of_winners - 1 : pattern?.claimed = true,
      pattern?.claimedBy = user_id;
    fetching_contest.save();
    console.log("test5->passed");
  } else {
    console.log("test5->failed");
    return {
      success: false,
      message: "could not find the patterns in the contests ",
    };
  }

  //6
  const findng_pattern = await find_ticket_array({
    contest_id: fetching_contest?._id,
    ticket_id: new mongoose.Types.ObjectId(ticket_id),
    ticket_pattern_id: new mongoose.Types.ObjectId(ticket_pattern_id),
    pattern: pattern_name,
  });
  if (findng_pattern) {
    console.log("test6->passed");
  } else {
    console.log("test6->failed");
    return {
      success: false,
      message: "could not find the the array in the ticket ",
    };
  }
  //7
  const find_doc = findng_pattern.tickets[ 0 ].ticket.ticket_pattern.find(
    (data) => data.pattern === pattern_name
  );
  if (find_doc !== undefined) {
    console.log("test7->passed");
  } else {
    console.log("test7->failed");
    return {
      success: false,
      message: "could not find the the array in the doc ",
    };
  }
  //8
  const match_arry = find_doc.pattern_array.some((data) =>
    arrr_data.includes(data)
  );
  if (match_arry) {
    console.log("test8->passed");
  } else {
    console.log("test8->failed");
    return {
      success: false,
      message: "could not find the the array in the doc ",
    };
  }
  //9
  const prize = contest_pattern_claim.find((data) => {
    if (data.pattern === pattern_name) {
      return data.prize;
    }
  });
  const wallet_update = await update_wallet_virtual({
    user_id: new mongoose.Types.ObjectId(user_id),
    amount: prize?.prize,
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

exports.how_many_contes_joined_logic = async (user_id) => {
  const returning = await contests_joined({
    user_id: user_id,
  });
  if (returning.success) {
    return {
      success: true,
      data: returning.data,
    };
  } else {
    return {
      success: false,
      message: returning.message,
    };
  }
};
