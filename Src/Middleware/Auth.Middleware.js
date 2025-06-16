const Admin = require("../Models/Admin.Model");
const User = require("../Models/User.Model");
const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const jwt = require("jsonwebtoken");
const ApiResponse = require("../Utils/NewApiResponse");
const { response } = require("../Utils/response.Utils");

exports.authentication = asyncHandler(async (req, res, next) => {
  console.log("|authentication starts|");

  const authHeader = req.headers.authorization || req.headers.Authorization;
  let tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies.accessToken;
  if (tokenFromHeader !== undefined || tokenFromHeader !== null) {
    console.log("test1-token-passed");
  } else {
    console.log("test1-token-failed");
    return response(
      401,
      "Unauthorized → Authentication needed or failed (no/invalid token)",
      null
    );
  }
  const decode = jwt.verify(tokenFromHeader, process.env.GENERATE_TOKEN_SECRET);
  if (decode) {
    console.log("test2-token-passed");
  } else {
    console.log("test2-token-failed");
    return response(
      400,
      "Bad Request → Invalid input, missing data, malformed request.(could nto decode)",
      null
    );
  }

  if (decode?.role !== "admin") {
    const data = await User.findById(decode.id);
    if (data) {
      console.log("test3-token-passed");
    } else {
      console.log("test3-token-failed");
      return response(
        404,
        "Bad Request → Invalid input, missing data, malformed request.(could nto decode)",
        null,
        res
      );
    }
    req.user = data;
  } else {
    const data = await Admin.findById(decode.id);
    if (data) {
      console.log("test3-token-passed");
    } else {
      console.log("test3-token-passed");
      return response(
        404,
        "Bad Request → Invalid input, missing data, malformed request.(could nto decode)",
        null,
        res
      );
    }
    req.admin = data;
  }

  console.log("|authentication end|");
  next();
});

exports.check_authority_admin = (req, res, next) => {
  if (req?.admin) {
    console.log("kkkkkkkkk");
  } else {
    return response(
      401,
      "Unauthorized → Authentication needed or failed (no/invalid token)",
      null
    );
  }
  next();
};
