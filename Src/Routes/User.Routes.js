const { authentication } = require("../Middleware/Auth.Middleware");
const {
  buyTicket,
  join_contest,
  claim_patterns,
} = require("../Controller/User.Controller");
const router = require("express").Router();

router.post("/buy_ticket", authentication, buyTicket);
router.post("/join_contes", authentication, join_contest);
router.post("/claim_pattern", authentication, claim_patterns);

module.exports = router;
