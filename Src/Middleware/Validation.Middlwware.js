const { find_Admin_by_id } = require("../Repository/Admin.Repository");
const { find_user_by_id } = require("../Repository/User.Repository");
const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");

exports.validation_check = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const user_exist = find_user_by_id(req.user.id);
    if (user_exist) {
      console.log("test1->passed");
    } else {
      console.log("test1->failed");
      response(
        404,
        "Not Found → Resource doesn’t exist (wrong URL or ID)",
        null,
        res
      );
    }
  } else if (req.admin) {
    const admin_exist = find_Admin_by_id(req.admin.id);
    if (admin_exist) {
      console.log("test1->passed");
    } else {
      console.log("test1->failed");
      response(
        404,
        "Not Found → Resource doesn’t exist (wrong URL or ID)",
        null,
        res
      );
    }
  } else {
    response(
      401,
      "Unauthorized → Authentication needed or failed (no/invalid token)",
      null,
      res
    );
  }

  next();
});
