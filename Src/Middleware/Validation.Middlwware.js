const { find_Admin_by_id } = require("../Repository/Admin.Repository");
const { find_user_by_id } = require("../Repository/User.Repository");
const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { response } = require("../Utils/response.Utils");

exports.validation_check = asyncHandler(async (req, res, next) => {
  try {
    if (req.user) {
      const userExist = await find_user_by_id(req.user.id);
      if (userExist) {
        console.log("User validation → passed");
        console.log(req.query);
        return next();
      } else {
        console.log("User validation → failed");
        return response(
          404,
          "User Not Found → Invalid user ID or resource doesn't exist",
          null,
          res
        );
      }
    } else if (req.admin) {
      const adminExist = await find_Admin_by_id(req.admin.id);
      if (adminExist) {
        console.log("Admin validation → passed");
        return next();
      } else {
        console.log("Admin validation → failed");
        return response(
          404,
          "Admin Not Found → Invalid admin ID or resource doesn't exist",
          null,
          res
        );
      }
    } else {
      return response(
        401,
        "Unauthorized → Authentication needed or failed (no/invalid token)",
        null,
        res
      );
    }
  } catch (error) {
    console.error("Validation error:", error);
    return response(500, "Internal Server Error", null, res);
  }
});
