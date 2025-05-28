const { agenda } = require("./Agenda"); // ✅ correct destructure

exports.cancel = async ({ data, currentJobId }) => {
  return await agenda.cancel({
    name: "job_scheduling",
    "data.data": data,
    _id: { $ne: currentJobId },
  });
};

exports.schedule = async ({ data }) => {
  return await agenda.schedule(
    new Date(Date.now() + 3 * 60 * 60 * 1000),
    "job_scheduling",
    { data }
  );
};
