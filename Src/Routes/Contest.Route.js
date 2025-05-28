const {
  automatic_contest,
  fetch_contests,
} = require("../Controller/Contest.Controller");
const {
  authentication,
  check_authority_admin,
} = require("../Middleware/Auth.Middleware");
const { validation_check } = require("../Middleware/Validation.Middlwware");

const router = require("express").Router();

router.post(
  "/automatic_contest",
  authentication,
  check_authority_admin,
  validation_check,
  automatic_contest
);

router.get(
  "/fetch_contest",
  authentication,
  validation_check,
  fetch_contests
);

module.exports = router;
