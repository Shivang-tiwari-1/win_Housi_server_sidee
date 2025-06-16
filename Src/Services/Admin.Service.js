const { default: mongoose } = require("mongoose");
const { Data_for_contests } = require("../Constants");
const {
  create_contests,
  fetch_all_contest,
  update_contest_status,
  fetch_contest_by_id,
  delete_contest,
} = require("../Repository/Contest.Repository");
const { agenda } = require("../ServerSide_scheduling/Agenda");

exports.automatic_contest_logic = async (Data) => {
  const contests = await fetch_all_contest({
    admin_id: Data.admin_id,
    state: "Scheduled",
  });
  console.log(contests);
  if (contests.length === 0) {
    try {
      await Promise.all(
        Data_for_contests.map(async (item) => {
          await create_contests({
            admin_id: Data.admin_id,
            participants: item.participants,
            prize: item.prize,
            ticket_prize: item.ticket_prize,
            contest_pattern_claim: item.patterns,
          });
        })
      );

      await agenda.schedule(
        new Date(Date.now() + 3 * 60 * 60 * 1000),
        "job_scheduling",
        {
          data: Data.admin_id,
        }
      );
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: `${error}`,
      };
    }
  } else if (contests.length > 0) {
    agenda.stop().then(() => {
      console.log(
        " automatic contest scheduling is stopped-{agenda has stopped as well}"
      );
    });

    const result = await mongoose.connection
      .collection("agendaJobs")
      .findOneAndDelete({
        "data.data": Data.admin_id,
      });
    if (result) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: "could not update the agenda",
      };
    }
  } else {
    return {
      success: false,
      message: "unrecognized",
    };
  }
};
exports.create_contest_manually_logic = async (
  admin_id,
  participants,
  number_of_contestants,
  prize,
  ticket_prize,
  contest_pattern_claim
) => {
  const creating = create_contests({
    admin_id: admin_id,
    participants: participants,
    number_of_contestants: number_of_contestants,
    prize: prize,
    ticket_prize: ticket_prize,
    contest_pattern_claim: contest_pattern_claim,
  });
  if (creating) {
    console.log("test2->passed");
    return {
      success: true,
      data: creating,
    };
  } else {
    console.log("test2->failed");
    return {
      success: false,
      message: "could not create the contest ",
    };
  }
};
exports.start_contest_logic = async (contest_id) => {
  const lok_for_contest_id = await fetch_contest_by_id({
    contest_id: contest_id,
  });
  if (lok_for_contest_id) {
    console.log("test2->passed");
  } else {
    console.log("test2->passed");
    return {
      success: false,
      message: "could not find the contest",
    };
  }
  const updating = await update_contest_status({
    contest_id: lok_for_contest_id?._id,
  });
  if (updating) {
    console.log("test3->passed");
    return {
      success: true,
      data: updating,
    };
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "could not start the contest ",
    };
  }
};
exports.delete_contest_logic = async (contest_id) => {
  const lok_for_contest_id = await fetch_contest_by_id({
    contest_id: contest_id,
  });
  console.log(lok_for_contest_id);
  if (lok_for_contest_id) {
    console.log("test2->passed");
  } else if (lok_for_contest_id === undefined) {
    return {
      success: true,
      data: "this id does not exist",
    };
  } else {
    console.log("test2->passed");
    return {
      success: false,
      message: "could not find the contest",
    };
  }

  const updating = await delete_contest({
    contest_id: lok_for_contest_id?._id,
  });
  if (updating) {
    console.log("test3->passed");
    return {
      success: true,
      data: updating,
    };
  } else {
    console.log("test3->failed");
    return {
      success: false,
      message: "could not start the contest ",
    };
  }
};
