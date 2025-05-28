const { default: mongoose } = require("mongoose");
const { Data_for_contests, agebdaRunning } = require("../Constants");
const {
  create_contests,
  fetch_all_contest,
} = require("../Repository/Contest.Repository");
const { agenda } = require("../ServerSide_scheduling/Agenda");

exports.automatic_contest_logic = async (Data) => {
  const contests = await fetch_all_contest({
    admin_id: Data.admin_id,
    state: "pending",
  });
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
