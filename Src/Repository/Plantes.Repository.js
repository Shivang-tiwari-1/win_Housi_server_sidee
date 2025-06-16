const PlantedUsers = require("../Models/InternalUser.Model");

exports.createPlantedUser = async (user_Data) => {
  const { name, email, phone } = user_Data;
  const user = await PlantedUsers.create({
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
