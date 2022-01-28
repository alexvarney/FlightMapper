import express from "express";
import Database from "better-sqlite3";

const db = new Database("navdata.sqlite", { verbose: console.log });

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/airport/:code", (req, res) => {
  const { code } = req.params;

  const data = db
    .prepare("SELECT * FROM airport WHERE ident = ?")
    .get(code.toUpperCase());

  if (!data) {
    res.send(404);
  }

  res.send(data);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
