import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const PORT = 3001;

const db = new Database("navdata.sqlite", { verbose: console.log });

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/airport/:code", (req, res) => {
  const { code } = req.params;

  const data = db
    .prepare("SELECT * FROM airport WHERE ident = ?")
    .get(code.toUpperCase());

  if (!data) {
    console.log("No data found for " + code);
    res.send(404);
  }

  res.send(data);
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
