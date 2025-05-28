const { automatic_contest_logic } = require("../Services/Admin.Service");
const { fetch_contest_logic } = require("../Services/Contest.Service");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");

exports.automatic_contest = asyncHandler(async (req, res) => {
  const automating = await automatic_contest_logic({ admin_id: req.admin.id });
  if (automating.success) {
    console.log("All test->passed");
    response(200, "contests created", automating, res);
  } else {
    console.log("last test->failed");
    response(401, automating?.message, null, res);
  }
});

exports.fetch_contests = asyncHandler(async (req, res) => {
  const fetching = await fetch_contest_logic();
  if (fetching.success) {
    response(200, "fetching successful", fetching?.data, res);
  } else {
    response(401, fetching?.message, null, res);
  }
});

