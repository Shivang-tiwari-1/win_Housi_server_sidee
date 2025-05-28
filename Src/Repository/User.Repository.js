const Admin = require("../Models/Admin.Model");
const User = require("../Models/User.Model");

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
