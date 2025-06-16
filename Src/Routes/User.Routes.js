const { authentication } = require("../Middleware/Auth.Middleware");
const {
  buyTicket,
  join_contest,
  claim_patterns,
  how_many_contes_joined,
} = require("../Controller/User.Controller");
const router = require("express").Router();

router.post("/buy_ticket", authentication, buyTicket);
router.post("/join_contes", authentication, join_contest);
router.post("/claim_pattern", authentication, claim_patterns);
router.get("/contests_joined", authentication, how_many_contes_joined);

module.exports = router;
