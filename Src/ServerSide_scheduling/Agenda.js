const { Agenda } = require("agenda");
const { create_contests } = require("../Repository/Contest.Repository");
const { Data_for_contests, agebdaRunning } = require("../Constants");

const ApiError = require("../Utils/ApiError.Utils");
const status = require("../Constants");
const { cancle, Schedule } = require("./Agenda.Services");

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: "agendaJobs" },
  debug: true,
});

agenda.define("job_scheduling", async (job) => {
  try {
    const { data } = job.attrs.data;
    if (!data) {
      throw new ApiError(401, "error-occurred");
    }

    const currentJobId = job.attrs._id;
    if (!currentJobId) {
      throw new ApiError(401, "error-occurred");
    }

    await Promise.all(
      Data_for_contests.map(async (item) => {
        await create_contests({
          admin_id: data,
          participants: item.participants,
          prize: item.prize,
          ticket_prize: item.ticket_prize,
          contest_pattern_claim: item.patterns,
        });
      })
    );

    const cancle_old_job = await cancle({
      data: data,
      currentJobId: currentJobId,
    });
    if (!cancle_old_job) {
      throw new ApiError(401, "error-occurred");
    }

    const schedule_new_job = await Schedule({
      data: data,
    });
    if (!schedule_new_job) {
      throw new ApiError(401, "error-occurred");
    }
  } catch (error) {
    throw new ApiError(500, `error occurred:${error}`);
  }
});

async function startAgendaWithSchedules() {
  await agenda.start();
  console.log("Agenda jobs scheduled.");
}

module.exports = { agenda, startAgendaWithSchedules };
