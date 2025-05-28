const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { corsOptions } = require("./Constants");
const app = express();
const AuthenticationRoute = require("./Routes/Authentication.Route.js");
const Wallet = require("./Routes/Wallet.Route.js");
const Contests = require("./Routes/Contest.Route.js");
const Ticket = require("./Routes/Ticket.Routes.js");
const Admin = require("./Routes/Admin.Routes");
const Scam = require("./Routes/Scam.Routes.js");
const ScamTicket = require("./Routes/ScamTicket.Route.js");
const User = require("../Src/Routes/User.Routes");

app.use(express.json({ limit: "32mb" }));
app.use(express.urlencoded({ extended: true, limit: "32mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/authenticate", AuthenticationRoute);
app.use("/api/wallet", Wallet);
app.use("/api/Contests", Contests);
app.use("/api/Ticket", Ticket);
app.use("/api/Admin", Admin);
app.use("/api/Scam", Scam);
app.use("/api/ScamTicket", ScamTicket);
app.use("/api/UserApi", User);

module.exports = app;
