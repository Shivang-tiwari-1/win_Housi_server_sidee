const { agenda } = require("./Agenda");

exports.cancle = async (data) => {
  return await agenda.cancel({
    name: "job_scheduling",
    "data.data": data.data,
    _id: { $ne: data.currentJobId },
  });
};

exports.Schedule = async (data) => {
  await agenda.schedule(
    new Date(Date.now() + 3 * 60 * 60 * 1000),
    "job_scheduling",
    {
      data: data.data,
    }
  );
};
