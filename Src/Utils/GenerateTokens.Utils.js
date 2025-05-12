const { find_Admin_by_id } = require("../Repository/Admin.Repository");
const { find_user_by_id } = require("../Repository/User.Repository");

exports.GenerateTokens = async (user) => {
  console.log("|");
  console.log("|generating tokens....|");
  try {
    const data =
      user.role === "admin"
        ? await find_Admin_by_id(user?._id)
        : await find_user_by_id(user?._id);
    if (data) {
      console.log("test1->passed");
    } else {
      console.log("test1->failed");
      return false;
    }

    const accessToken = await data?.generate_Access_Token();
    if (accessToken) {
      console.log("test2-passed");
    } else {
      console.log("test2-failed");
      return false;
    }

    const refreshToken = await data?.generate_Refresh_Token();
    if (refreshToken) {
      console.log("test3-passed");
    } else {
      console.log("test3-failed");
      return false;
    }

    data.refreshToken = refreshToken;
    if (data.refreshToken) {
      console.log("test4-passed");
    } else {
      return false;
    }

    await data.save({ validateBeforeSave: false });
    console.log("|generating tokens ends....|");
    console.log("|");
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};
