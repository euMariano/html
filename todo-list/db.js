const Database = require("better-sqlite3");

const db = new Database("todo.db");

db.prepare(
  `
		CREATE TABLE IF NOT EXISTS todos (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				text TEXT NOT NULL,
				done INTEGER DEFAULT 0

)
`,
).run();

module.exports = db;
