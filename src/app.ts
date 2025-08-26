import express from "express";
import {
  NOTES,
  INTERESTING_LOCATIONS,
  AVAILABLE_LOCATIONS,
} from "./utils/constants";
import { renderNoteItem } from "./components/note-item";
import renderLocationsPage from "./components/location";
import renderLocationItem from "./components/locationItem";
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
      ${NOTES.map((note) => renderNoteItem(note)).join("")}
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

  setTimeout(() => {
    res.send(`
    <div class="notes-list" hx-confirm="Do you want to delete it?">
      ${NOTES.map((note) => renderNoteItem(note)).join("")}
    </div>
  `);
  }, 10000);
});

app.get("/locations", (req, res) => {
  // Get data to populate the page
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );
  res.send(renderLocationsPage(availableLocations, INTERESTING_LOCATIONS));
});

app.post("/places", (req, res) => {
  const locationId = req.body.locationId;
  const location = AVAILABLE_LOCATIONS.find((loc) => loc.id === locationId);
  INTERESTING_LOCATIONS.push(location);

  res.send(renderLocationItem(location));
});

app.delete("/places/:id", (req, res) => {
  const locationId = req.params.id;
  const locationIndex = INTERESTING_LOCATIONS.findIndex(
    (loc) => loc.id === locationId
  );
  INTERESTING_LOCATIONS.splice(locationIndex, 1);

  res.send();
});

app.listen(port, () => {
  return console.log(`listening at port: ${port}`);
});
