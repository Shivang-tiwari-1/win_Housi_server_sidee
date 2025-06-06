const { options } = require("../Constants");
const {
  create_user_logic,
  generate_otp_logic,
  login_logic,
} = require("../Services/Authentication.Services");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const { GenerateTokens } = require("../Utils/GenerateTokens.Utils");
const ApiResponse = require("../Utils/NewApiResponse");
const { response } = require("../Utils/response.Utils");

exports.create_user = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    console.log("test3-passed");
  } else {
    console.log("test3-failed");
    response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const creating_user = await create_user_logic(req.body);
  if (creating_user.success) {
    console.log("test6->passed");
    response(200, "User created", create_user_logic, res);
  } else {
    console.log("test6->failed");
    response(400, create_user_logic.message, null, res);
  }
});

exports.GenerateOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (phone) {
    console.log("test1->passed");
  } else {
    console.log("test1->failed");
    response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const generating_otp = await generate_otp_logic(phone);
  const otp = generate_otp_logic.otp;
  if (generating_otp.success) {
    return res.status(200).json(new ApiResponse(200, otp, "otp_generated"));
  } else {
    response(400, generating_otp.message, null, res);
  }
});

exports.login_user_otp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  if (phone && otp) {
    console.log("test1->passed");
  } else {
    console.log("test1->failed");
    response(
      400,
      "Bad Request → Invalid input, missing data, malformed request",
      null,
      res
    );
  }

  const logging_in = await login_logic(phone, otp);
  if (logging_in.success) {
    console.log("test6->passed");
  } else {
    console.log("test6->failed");
    return response(400, logging_in.message, null, res);
  }

  const { accessToken, refreshToken } = await GenerateTokens(logging_in?.user);
  if ((accessToken, refreshToken)) {
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: logging_in?.user, accessToken, refreshToken },
          "user logged in successfully"
        )
      );
  }
});

exports.update = asyncHandler(async (req, res) => {});

exports.delete = asyncHandler(async (req, res) => {});

exports.logout = asyncHandler(async (req, res) => {});
