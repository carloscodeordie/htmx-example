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
    <div class="notes-list">
      ${NOTES.map(
        (note, index) => `<div class="notes-list-item" id="note-${index}">
          <span>${note}</span>
          <button
            hx-delete="/notes/${index}"
            hx-target="#note-${index}"
            hx-swap="outerHTML"
          >Delete</button>
        </div>`
      ).join("")}
    </div>
  `);
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  NOTES.splice(parseInt(id), 1);

  res.send();
});

app.post("/notes", (req, res) => {
  const { note } = req.body;

  // Save notes on memory
  NOTES.push(note);

  res.redirect("/notes");
});

app.listen(port, () => {
  return console.log(`listening at port: ${port}`);
});
