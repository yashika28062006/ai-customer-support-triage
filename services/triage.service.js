const fs = require("fs");
const db = require("../db");

let stats = {
  totalTickets: 0,
  processingTimeMs: 0,
  tokenUsage: 0,
  categoryDistribution: {},
};

const triageTickets = async (req, res) => {
  const start = Date.now();

  const tickets = req.body.tickets || [];

  const results = tickets.map((ticket) => {
    let category = "technical";

    if (ticket.message?.toLowerCase().includes("payment")) {
      category = "billing";
    }

    return {
      id: ticket.id,
      category,
      priority: "medium",
      team: "support",
    };
  });

  const insert = db.prepare(`
    INSERT OR REPLACE INTO tickets
    (id,message,ai_category,priority,team)
    VALUES (?,?,?,?,?)
  `);

  results.forEach((r, index) => {
    insert.run(
      r.id,
      tickets[index].message,
      r.category,
      r.priority,
      r.team
    );
  });

  fs.writeFileSync(
    "triage_results.json",
    JSON.stringify(results, null, 2)
  );

  stats.totalTickets = tickets.length;
  stats.processingTimeMs = Date.now() - start;

  stats.categoryDistribution = {};

  results.forEach((r) => {
    stats.categoryDistribution[r.category] =
      (stats.categoryDistribution[r.category] || 0) + 1;
  });

  res.json({ results });
};

const getStats = (req, res) => {
  res.json(stats);
};

module.exports = {
  triageTickets,
  getStats,
};