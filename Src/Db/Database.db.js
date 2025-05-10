const mongoose = require("mongoose");

exports.connect_To_mongo = async () => {
  try {
    const connecting_TO_mongo = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log("\n Mongoose connected !! DB host: ");
    console.log("Connected DB:", connecting_TO_mongo.connection.name);
    console.log("Connected Port:", connecting_TO_mongo.connection.port);
    console.log("Connected Host:", connecting_TO_mongo.connection.host);
  } catch (error) {
    throw new Error(error);
  }
};
