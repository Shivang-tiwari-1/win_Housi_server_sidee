const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { corsOptions } = require("./Constants");
const app = express();
const AuthenticationRoute = require("./Routes/Authentication.Route.js");

app.use(express.json({ limit: "32mb" }));
app.use(express.urlencoded({ extended: true, limit: "32mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/authenticate", AuthenticationRoute);

module.exports = app;
