const Admin = require("../Models/Admin.Model");

exports.find_Admin_by_id = async (id) => {
  const data = await Admin.findById(id);
  if (data) {
    return data;
  } else {
    return true;
  }
};
