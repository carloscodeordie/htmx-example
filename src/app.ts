import express from "express";
import { NOTES } from "./utils/constants";
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/notes/new", (req, res) => {
  res.render("notes");
});

app.get("/notes", (req, res) => {
  res.send(`
    <ul>
      ${NOTES.map((note) => `<li>${note}</li>`).join("")}
    </ul>
  `);
});

app.post("/notes", (req, res) => {
  const { note } = req.body;

  // Save notes on memory
  NOTES.push(note);

  res.send(`
    <ul>
      ${NOTES.map((note) => `<li>${note}</li>`).join("")}
    </ul>
  `);
});

app.listen(port, () => {
  return console.log(`listening at port: ${port}`);
});
