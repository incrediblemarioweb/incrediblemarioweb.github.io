const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, "db", "scores.json");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/score/:id", (req, res) => {
  const id = req.params.id;
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json({ score: db[id] || 0 });
});

app.post("/api/score", (req, res) => {
  const { id, delta } = req.body;
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  db[id] = (db[id] || 0) + delta;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ success: true, score: db[id] });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
