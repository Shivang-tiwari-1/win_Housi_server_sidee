const { default: mongoose } = require("mongoose");
const Contest = require("../Models/Contest.Models");
const Tickets = require("../Models/Tickets.Models");

exports.create_contests = async (data) => {
  const creating_contests = await Contest.create({
    admin_id: data.admin_id,
    number_of_contestants: data.participants,
    prize: data.prize,
    ticket_prize: data.ticket_prize,
    contest_pattern_claim: data.contest_pattern_claim,
  });
  if (creating_contests) {
    return creating_contests;
  } else {
    return false;
  }
};
exports.fetch_contest = async () => {
  const contests = await Contest.find();
  if (contests.length > 0) {
    return contests;
  } else {
    return false;
  }
};
exports.fetch_contest_by_id = async (data) => {
  const fetch = await Contest.findById(data.contest_id);
  console.log(fetch);
  if (fetch) {
    return fetch;
  } else if (fetch === null) {
    return undefined;
  } else {
    return false;
  }
};
exports.fetch_all_contest = async (data) => {

  return await Contest.find({
    admin_id: new mongoose.Types.ObjectId(data.admin_id),
    contest_state: data.state,
  });
};
exports.update_contest_participants = async (data) => {
  const update = await Contest.findByIdAndUpdate(
    data.contest_id,
    {
      $push: {
        contest_participants: {
          participant: data.user_id,
          participant_ticket: data.participant_ticket,
        },
      },
    },
    {
      new: true,
    }
  );

  if (update) {
    return true;
  } else {
    return false;
  }
};
exports.find_if_user_alrady_exist = async (data) => {
  console.log(data);
  const returning = await Contest.findOne(
    {
      _id: data?.fetching_contest,
      contest_participants: {
        $elemMatch: {
          participant: new mongoose.Types.ObjectId(data?.user_id),
          participant_ticket: data?.finding_ticket,
        },
      },
    },
    {
      "contest_participants.$": 1,
    }
  );
  console.log(returning);
  if (returning) {
    return returning;
  } else {
    return false;
  }
};
exports.find_the_pattern = async (data) => {
  const returning = await Contest.find({ _id: data?.contest_id }, {});
};
exports.find_ticket_array = async (data) => {
  console.log(data);
  const returning = await Tickets.findOne(
    {
      _id: data?.ticket_id,
      tickets: {
        $elemMatch: {
          // "ticket._id": data?.ticket_pattern_id,
          "ticket.contestID": data?.contest_id,
          "ticket.ticket_pattern": {
            $elemMatch: {
              pattern: data?.pattern,
            },
          },
        },
      },
    },
    {
      "tickets.$": 1,
    }
  );
  console.log(returning);
  if (returning) {
    return returning;
  } else {
    return false;
  }
};
exports.update_contest_status = async (data) => {
  console.log(data);
  const updating = await Contest.findByIdAndUpdate(
    data.contest_id,
    {
      $set: {
        contest_state: "Live",
      },
    },
    {
      new: true,
    }
  );
  console.log(updating);
  if (updating) {
    return updating;
  } else {
    return false;
  }
};
exports.delete_contest = async (data) => {
  const updating = await Contest.findByIdAndDelete(data.contest_id);
  if (updating) {
    return true;
  } else {
    return false;
  }
};
