const { options } = require("../Constants");

const {
  create_user_logic,
  generate_otp_logic,
  login_logic,
} = require("../Services/Authentication.Services");
const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { generateAccessToken } = require("../Utils/Auth.Utils");
const { GenerateTokens } = require("../Utils/GenerateTokens.Utils");
const ApiResponse = require("../Utils/NewApiResponse");

exports.create_user = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);
  if (name && email && phone) {
    console.log("test1-passed");
  } else {
    console.log("test1-failed");
    throw new ApiError(400, "incomplete data");
  }

  const creating_user = await create_user_logic(req.body);
  if (creating_user) {
    console.log("test2->passed");
    return res
      .status(200)
      .json(new ApiResponse(200, null, "user has been created"));
  } else {
    console.log("test2->failed");
    throw new ApiError(400, "could not create the user");
  }
});
exports.GenerateOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  console.log(phone)
  if (phone) {
    console.log("test1->passed");
  } else {
    console.log("test1->failed");
  }

  const generating_otp = await generate_otp_logic(phone);
  if (phone) {
    return res
      .status(200)
      .json(new ApiResponse(200, generating_otp, "otp has been generated"));
  } else {
    throw new ApiError(404, "could not complete the process");
  }
});
exports.login_user_otp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  if (phone && otp) {
    console.log("test2->passed");
    console.log(phone, otp);
  } else {
    console.log("test2->failed");
    throw new ApiError(400, "data is missing");
  }

  const logging_in = await login_logic(phone, otp);
  if (logging_in.success) {
    console.log("test6->passed");
  } else {
    console.log("test6->failed");
    throw new ApiError(400, "process failed");
  }

  const { accessToken, refreshToken } = await GenerateTokens(
    logging_in?.user
  );
  if ((accessToken, refreshToken)) {
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: logging_in?.user, accessToken, refreshToken },
          "user logged in succesfully"
        )
      );
  }
});
