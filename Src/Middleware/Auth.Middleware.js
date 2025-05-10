const Admin = require("../Models/Admin.Model");
const User = require("../Models/User.Model");
const ApiError = require("../Utils/ApiError.Utils");

exports.authentication = asyncHandler(async (req, res, next) => {
  console.log("|authentication starts|");

  const authHeader = req.headers.authorization || req.headers.Authorization;
  let tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies.token;
  if (tokenFromHeader !== null) {
    console.log("test1-token-passed");
  } else {
    console.log("test1-token-failed");
    throw new ApiError(400, "no token found");
  }

  const decode = jwt.verify(tokenFromHeader, process.env.GENERATE_TOKEN_SECRET);
  if (decode) {
    console.log("test2-token-passed");
  } else {
    console.log("test2-token-failed");
    return message(req, res, 500, "invalid token user id");
  }

  if (decode?.role === "User") {
    const data = await User.findById(decode.id);
    if (data) {
      console.log("test3-token-passed");
    } else {
      console.log("test3-token-failed");
      return message(req, res, 403, { error: "login please" });
    }
    req.user = data;
  } else {
    const data = await Admin.findById(decode.id);
    if (data) {
      console.log("test3-token-passed");
    } else {
      console.log("test3-token-passed");
      return message(req, res, 403, "could not find the user");
    }
    req.admin = data;
  }

  console.log("|authentication end|");
  next();
});
