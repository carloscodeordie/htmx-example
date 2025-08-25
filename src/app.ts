import express from "express";
import { NOTES } from "./utils/constants";
import { createNoteItem } from "./components/note-item";
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
      ${NOTES.map((note) => createNoteItem(note)).join("")}
    </div>
  `);
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  const noteIndex = NOTES.findIndex((note) => note.id === parseInt(id));

  NOTES.splice(noteIndex, 1);

  res.send();
});

app.post("/notes", (req, res) => {
  const { note } = req.body;

  // Save notes on memory
  NOTES.push({ id: new Date().getTime(), value: note });

  res.send(`
    <div class="notes-list">
      ${NOTES.map((note) => createNoteItem(note)).join("")}
    </div>
  `);
});

app.listen(port, () => {
  return console.log(`listening at port: ${port}`);
});
