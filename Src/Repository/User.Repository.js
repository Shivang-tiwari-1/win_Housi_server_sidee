const User = require("../Models/User.Model");

exports.createUser = async (user_Data, uploadimage) => {
  const { name, email, phone } = user_Data;
  const user = await User.create({
    name,
    email,
    phone,
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
  if (data) {
    return data[0];
  } else {
    return true;
  }
};

exports.delete_Otp = async (user) => {
  const data = await User.findByIdAndUpdate(
    user._id,
    { $unset: { otp: true } },
    { new: true }
  );
  console.log(data);
  if (data) {
    return true;
  } else {
    return false;
  }
};
