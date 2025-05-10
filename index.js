require("dotenv").config();
const app = require("./Src/App");
const http = require("http");
const { connect_To_mongo } = require("./Src/Db/Database.db");
const server = http.createServer(app);
connect_To_mongo();
server.listen(8000, '0.0.0.0', () => {
  console.log('Server running on port 8000');
});

