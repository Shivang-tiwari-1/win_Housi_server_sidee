const { fetch_contest } = require("../Repository/Contest.Repository");

exports.fetch_contest_logic = async () => {
  const fetching = await fetch_contest();
  if (fetching) {
    return {
      success: true,
      data: fetching,
    };
  } else {
    return {
      success: false,
      message: "error occurred",
    };
  }
};
