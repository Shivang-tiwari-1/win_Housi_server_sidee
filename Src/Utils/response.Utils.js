const ApiResponse = require("./NewApiResponse");

exports.response = async (status, message, data, res) => {
  return res
    .status(Number(status))
    .json(new ApiResponse(Number(status), data, String(message)));
};
