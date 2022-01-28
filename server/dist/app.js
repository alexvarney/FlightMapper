"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default("navdata.sqlite", { verbose: console.log });
const app = (0, express_1.default)();
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
//# sourceMappingURL=app.js.map