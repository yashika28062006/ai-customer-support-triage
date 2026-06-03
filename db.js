const Database = require("better-sqlite3");

const db = new Database("database.sqlite");

db.exec(`
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY,
  message TEXT,
  ai_category TEXT,
  human_category TEXT,
  priority TEXT,
  team TEXT
);

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER,
  ai_category TEXT,
  human_category TEXT,
  delta INTEGER
);
`);

module.exports = db;