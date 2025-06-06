require("dotenv").config();
const app = require("./Src/App");
const http = require("http");
const { connect_To_mongo } = require("./Src/Db/Database.db");
const {
  startAgendaWithSchedules,
  agenda,
} = require("./Src/ServerSide_scheduling/Agenda");
const { default: mongoose } = require("mongoose");

const server = http.createServer(app);

(async () => {
  try {
    await connect_To_mongo();

    if (!mongoose.connection.db) {
      console.error("Mongoose connection DB is not ready!");
      process.exit(1);
    }
    agenda.mongo(mongoose.connection.db, "agendaJobs");

    await startAgendaWithSchedules();

    server.listen(process.env.PORT || 8000, "0.0.0.0", () => {
      console.log(
        `Server running on port https://localHost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
})();
