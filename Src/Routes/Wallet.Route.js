const {
  create_request,
  add_money,
  fetch_wallet,
} = require("../Controller/Wallet.Controller");
const { authentication } = require("../Middleware/Auth.Middleware");
const { validation_check } = require("../Middleware/Validation.Middlwware");

const router = require("express").Router();

router.post("/make_request", authentication, validation_check, create_request);
router.post("/add_money", authentication, validation_check, add_money);
router.get("/fetching_wallet", authentication, validation_check, fetch_wallet);
module.exports = router;
