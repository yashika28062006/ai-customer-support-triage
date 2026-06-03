const fs = require("fs");
const db = require("../db");

const getAccuracyReport = (req, res) => {
  const rows = db.prepare(`
    SELECT *
    FROM feedback
  `).all();

  let correct = 0;

  rows.forEach((r) => {
    if (r.delta === 0) {
      correct++;
    }
  });

  const accuracy =
    rows.length === 0
      ? 100
      : (correct / rows.length) * 100;

  const report = {
    overallAccuracy: Number(
      accuracy.toFixed(2)
    ),
    totalReviewed: rows.length,
  };

  fs.writeFileSync(
    "accuracy_report.json",
    JSON.stringify(report, null, 2)
  );

  res.json(report);
};

module.exports = {
  getAccuracyReport,
};