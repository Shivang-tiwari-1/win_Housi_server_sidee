const { Agenda } = require("agenda");

const automatic_contest_scheduling = new Agenda({
  db: { address: process.env.MONGO_URI, collection: "agendaJobs_contest_scheduling" },
  debug: true,
});


agenda.define("automatic_contest_scheduling",async()=>{
    
})