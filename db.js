const Database = require("better-sqlite3");

const db = new Database("database.sqlite");

db.exec(`
CREATE TABLE IF NOT EXISTS tickets(
id INTEGER PRIMARY KEY,
message TEXT,
ai_category TEXT,
human_category TEXT,
priority TEXT,
team TEXT
);
`);

module.exports = db;