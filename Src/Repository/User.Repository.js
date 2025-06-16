const { default: mongoose } = require("mongoose");
const Admin = require("../Models/Admin.Model");
const User = require("../Models/User.Model");
const PlantedUsers = require("../Models/InternalUser.Model");

exports.createUser = async (user_Data, uploadimage) => {
  const { name, email, phone } = user_Data;
  const user = await User.create({
    name: name,
    email: email,
    phone: phone,
  });
  if (!user) {
    return false;
  } else {
    return user;
  }
};
exports.find_user_by_email = async (email) => {
  const data = await User.find({ email: email });
  if (data) {
    return false;
  } else {
    return true;
  }
};
exports.find_user_by_id = async (id) => {
  const data = await User.findById(id);
  if (data) {
    return data;
  } else {
    return true;
  }
};
exports.find_user_by_phone = async (phone) => {
  const data = await User.find({ phone: phone });
  if (data.length > 0) {
    return data[0];
  } else {
    const data = await Admin.find({ phone: phone });
    if (data) {
      return data[0];
    } else {
      return false;
    }
  }
};
exports.delete_Otp = async (user) => {
  const data = await User.findByIdAndUpdate(
    user._id,
    { $unset: { otp: true } },
    { new: true }
  );
  if (data) {
    return true;
  } else {
    const data = await Admin.findByIdAndUpdate(
      user._id,
      { $unset: { otp: true } },
      { new: true }
    );
    if (data) {
      return data;
    } else {
      return false;
    }
  }
};
exports.update_in_game_status = async (data) => {
  const updating = await User.findByIdAndUpdate(
    data?.id,
    {
      $set: {
        in_game: true,
      },
    },
    {
      new: true,
    }
  );

  if (updating) {
    return true;
  } else {
    return false;
  }
};
exports.contests_joined = async (user_id) => {
  try {
    const id =
      typeof user_id === "object" && user_id.user_id
        ? user_id.user_id
        : user_id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user_id format");
    }

    const userObjectId = new mongoose.Types.ObjectId(id);

    const pipeline = await User.aggregate([
      {
        $match: {
          _id: userObjectId,
        },
      },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "userId",
          as: "result",
        },
      },
      {
        $project: {
          result: 1,
        },
      },
    ]);

    return {
      success: true,
      data: pipeline,
    };
  } catch (error) {
    console.log("Aggregation error:", error);
    return {
      success: false,
      message: error.message || "Unknown error",
    };
  }
};
exports.update_user_History = async (data) => {
  const update_user_history = await User.findByIdAndUpdate(
    data?.user_id,
    {
      $push: {
        history: {
          day_time_date: new Date(),
          contestId: data?.fetching_contest.toString(),
        },
      },
    },
    { new: true }
  );
  if (update_user_history) {
    return true;
  } else {
    return false;
  }
};
exports.look_up_in_all_collections_phone_email = async (data) => {
  let field;
  for (let key in data) {
    field = key;
  }
  let look_up_in_user;
  let look_up_in_admin;
  let look_up_in_planted_user;

  look_up_in_user = await User.find({ [field]: data?.[field] });
  if (look_up_in_user.length === 0) {
    look_up_in_admin = await Admin.find({
      [field]: data?.[field],
      role: "admin",
    });
    if (look_up_in_admin.length === 0) {
      look_up_in_planted_user = await PlantedUsers.find({
        [field]: data?.[field],
      });
      if (look_up_in_planted_user.length === 0) {
        return false;
      } else {
        return { data: look_up_in_planted_user[0], collection: "plantedUsers" };
      }
    } else {
      return { data: look_up_in_admin[0], collection: "admin" };
    }
  } else {
    return { data: look_up_in_user[0], collection: "user" };
  }
};
