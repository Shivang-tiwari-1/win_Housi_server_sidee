const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");

exports.create_contest = asyncHandler(async (req, res) => {
  const if_exists = await find_Admin_by_id(req.admin.id);
  if (if_exists) {
    console.log("test1->passed");
  } else {
    console.log("test1->failed");
    throw new ApiError(404, "could not find the user");
  }

});
