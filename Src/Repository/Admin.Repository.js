const Admin = require("../Models/Admin.Model");

exports.find_Admin_by_id = async (id) => {
  const data = await Admin.findById(id);
  if (data) {
    return data;
  } else {
    return true;
  }
};

exports.createAdminUser = async (user_Data) => {
  const { name, email, phone } = user_Data;
  const user = await Admin.create({
    name: name.slice(0, -1),
    email: email,
    phone: phone,
  });
  if (!user) {
    return false;
  } else {
    return user;
  }
};
