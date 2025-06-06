const { fetch_ticket } = require("../Controller/Ticket.Controller");
const { authentication } = require("../Middleware/Auth.Middleware");

const router = require("express").Router();

router.get(
  "/fetch_ticket",
  authentication,
  fetch_ticket
);

module.exports = router;
