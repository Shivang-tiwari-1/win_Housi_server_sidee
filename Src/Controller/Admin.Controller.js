const { automatic_contest_logic } = require("../Services/Admin.Service");
const ApiError = require("../Utils/ApiError.Utils");
const { asyncHandler } = require("../Utils/AsyncHandler.Utils");
const ApiResponse = require("../Utils/NewApiResponse");
const { response } = require("../Utils/response.Utils");

exports.create_contest_manually = asyncHandler(async (req, res) => {});

exports.start_contest = asyncHandler(async (req, res) => {});

exports.extract_ticket_number = asyncHandler(async (req, res) => {});
