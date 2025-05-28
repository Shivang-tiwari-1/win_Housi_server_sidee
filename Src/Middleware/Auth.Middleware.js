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
    response(
      401,
      "Unauthorized → Authentication needed or failed (no/invalid token)",
      null
    );
  }
  console.log(tokenFromHeader);
  const decode = jwt.verify(tokenFromHeader, process.env.GENERATE_TOKEN_SECRET);
  if (decode) {
    console.log("test2-token-passed");
  } else {
    console.log("test2-token-failed");
    response(
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
      response(
        404,
        "Bad Request → Invalid input, missing data, malformed request.(could nto decode)",
        null
      );
    }
    req.user = data;
  } else {
    const data = await Admin.findById(decode.id);
    if (data) {
      console.log("test3-token-passed");
    } else {
      console.log("test3-token-passed");
      response(
        404,
        "Bad Request → Invalid input, missing data, malformed request.(could nto decode)",
        null
      );
    }
    req.admin = data;
  }

  console.log("|authentication end|");
  next();
});

exports.check_authority = (req, res, next) => {
  if (req.admin.role === "admin") {
    next();
  } else {
    response(
      401,
      "Unauthorized → Authentication needed or failed (no/invalid token)",
      null
    );
  }
};
