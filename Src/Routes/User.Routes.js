const { authentication } = require("../Middleware/Auth.Middleware");
const { validation_check } = require("../Middleware/Validation.Middlwware");
const { buyTicket } = require("../Controller/User.Controller");
const router = require("express").Router();

router.post("/buy_ticket", authentication, buyTicket);

module.exports = router;
