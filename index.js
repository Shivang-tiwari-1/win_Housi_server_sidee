require("dotenv").config();
const app = require("./Src/App");
const http = require("http");
const { connect_To_mongo } = require("./Src/Db/Database.db");
const { startAgendaWithSchedules } = require("./Src/ServerSide_scheduling/Agenda");
const server = http.createServer(app);

(async () => {
  await connect_To_mongo();
  await startAgendaWithSchedules();
  server.listen(8000, "0.0.0.0", () => {
    console.log("Server running on port 8000");
  });
})();
