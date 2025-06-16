const {
  start_contest,
  delete_contest,
} = require("../Controller/Admin.Controller");
const {
  authentication,
  check_authority_admin,
} = require("../Middleware/Auth.Middleware");

const router = require("express").Router();

router.post(
  "/start_contest",
  authentication,
  check_authority_admin,
  start_contest
);

router.delete(
  "/delete_contest",
  authentication,
  check_authority_admin,
  delete_contest
);

module.exports = router;
