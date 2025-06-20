const Razorpay = require("razorpay");

exports.corsOptions = {
  origin: ["http://192.168.0.113:8000", "http://localhost:8000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

exports.options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

exports.razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

exports.Data_for_contests = [
  {
    sum: 250,
    participants: 250,
    ticket_prize: 0,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 100,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 50,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 50,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 50,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 150000,
    participants: 4000,
    ticket_prize: 50,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 75000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (1 & 2)",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (2 & 3)",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (3 & 1)",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Pyramid",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Reverse Pyramid",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Corner",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "143 (I love You)",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 2,
      },
      {
        pattern: "Anda-Danda",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 2,
      },
      {
        pattern: "Odd Number",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 2,
      },
      {
        pattern: "Even Number",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 2,
      },
      {
        pattern: "1 from Each Line",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 2,
      },
      {
        pattern: "Smallest Five",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 2,
      },
      {
        pattern: "Bigger Five",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 2,
      },
      {
        pattern: "1 Balance in Full Housei",
        prize: 14000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 100000,
    participants: 30,
    ticket_prize: 5000,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 950,
    participants: 30,
    ticket_prize: 50,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 400,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 100,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 100,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 100,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Corner",
        prize: 75,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 75,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Odd Number",
        prize: 50,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Even Number",
        prize: 50,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 38000,
    participants: 2000,
    ticket_prize: 30,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 15000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (1 & 2)",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (2 & 3)",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (3 & 1)",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Pyramid",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Reverse Pyramid",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "143 (I love You)",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Anda-Danda",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Odd Number",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Even Number",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "1 from Each Line",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Smallest Five",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Bigger Five",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "1 Balance in Full Housei",
        prize: 5000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    Sum: 31000,
    participants: 50,
    ticket_prize: 1000,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 4000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 4000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 4000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (1 & 2)",
        prize: 1500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (2 & 3)",
        prize: 1500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (3 & 1)",
        prize: 1500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 2000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 2500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 145000,
    participants: 20,
    ticket_prize: 10000,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 40000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 20000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 20000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 20000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines",
        prize: 15000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 15000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 15000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 270000,
    participants: 15,
    ticket_prize: 25000,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 120000,
        claimed: false,
        claimedBy: null,
      },
      {
        pattern: "First Line",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 139000,
    participants: 10000,
    ticket_prize: 20,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 4000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 4000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 4000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (1 & 2)",
        prize: 1500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (2 & 3)",
        prize: 1500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (3 & 1)",
        prize: 1500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Pyramid",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Reverse Pyramid",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Corner",
        prize: 1000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "143 (I love You)",
        prize: 3000,
        claimed: false,
        claimedBy: null,

        no_of_winners: 3,
      },
      {
        pattern: "Anda-Danda",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Odd Number",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Even Number",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "1 from Each Line",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Smallest Five",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Bigger Five",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Above 50 (Young)",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Below 50 (Old)",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "T",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "H",
        prize: 3000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "1 Balance in Full Housei",
        prize: 25000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "2 Balance in Full Housei",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
    ],
  },
  {
    sum: 1100,
    participants: 100,
    ticket_prize: 20,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 100,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 100,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 100,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines",
        prize: 200,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 50,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 50,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
    ],
  },
  {
    sum: 3400000,
    participants: 100000,
    ticket_prize: 49,
    patterns: [
      {
        pattern: "Full Housie",
        prize: 2500000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "First Line",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Middle Line",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Last Line",
        prize: 50000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (1 & 2)",
        prize: 25000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (2 & 3)",
        prize: 25000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Twin Lines (3 & 1)",
        prize: 25000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Five",
        prize: 10000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "Early Ten",
        prize: 15000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "143 (I love You)",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Anda-Danda",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Odd Number",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Even Number",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "1 from Each Line",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Smallest Five",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Bigger Five",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Unlucky 1 (in First 10 number)",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Above 50",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "Below 50",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "T",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "H",
        prize: 7500,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
      {
        pattern: "1 Balance in Full Housei",
        prize: 350000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 1,
      },
      {
        pattern: "2 Balance in Full Housei",
        prize: 210000,
        claimed: false,
        claimedBy: null,
        no_of_winners: 3,
      },
    ],
  },
];

exports.numberRanges = [
  [1, 9],
  [10, 19],
  [20, 29],
  [30, 39],
  [40, 49],
  [50, 59],
  [60, 69],
  [70, 79],
  [80, 90],
];
