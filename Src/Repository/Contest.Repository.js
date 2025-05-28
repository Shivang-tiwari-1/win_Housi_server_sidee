const { default: mongoose, Types } = require("mongoose");
const Contest = require("../Models/Contest.Models");
const Wallet = require("../Models/Walllet.Model");
const now = new Date();
exports.create_contests = async (data) => {
  const creating_contests = await Contest.create({
    admin_id: data.admin_id,
    number_of_contestants: data.participants,
    prize: data.prize,
    ticket_prize: data.ticket_prize,
    contest_pattern_claim: data.contest_pattern_claim,
  });
  if (creating_contests) {
    return creating_contests;
  } else {
    return false;
  }
};

exports.fetch_contest = async () => {
  const contests = await Contest.find();
  if (contests.length > 0) {
    return contests;
  } else {
    return false;
  }
};

exports.fetch_contest_by_id = async (data) => {
  return await Contest.findById(data.contest_id);
};

exports.fetch_all_contest = async (data) => {
  return await Contest.find({
    admin_id: data.admin_id,
    contest_state: data.state,
  });
};

exports.fetch_all_contest_delete = async (data) => {};
