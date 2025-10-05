const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/todos", (req, res) => {
  const rows = db.prepare("SELECT * FROM todos").all();
  res.json(rows);
});

app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === "")
    return res.status(400).send("Texto inválido");
  const stmt = db.prepare("INSERT INTO todos (text) VALUES (?)");
  const info = stmt.run(text.trim());
  res.json({ id: info.lastInsertRowid, text, done: 0 });
});

app.put("/todos/:id", (req, res) => {
  const { done } = req.body;
  db.prepare("UPDATE todos SET done = ? WHERE id = ?").run(
    done ? 1 : 0,
    req.params.id,
  );
  res.sendStatus(200);
});

app.delete("/todos/:id", (req, res) => {
  db.prepare("DELETE FROM todos WHERE id = ?").run(req.params.id);
  res.sendStatus(200);
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000"),
);
