import express from "express";
import {
  NOTES,
  INTERESTING_LOCATIONS,
  AVAILABLE_LOCATIONS,
} from "./utils/constants";
import { renderNoteItem } from "./components/note-item";
import renderLocationsPage from "./components/location";
import renderLocationItem from "./components/locationItem";
import { getSuggestedLocations } from "./utils/suggested-locations";
import { LoginError } from "./models/interfaces";
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

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/authenticated", (req, res) => {
  res.render("authenticated");
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
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );
  const suggestedLocations = getSuggestedLocations();
  // Return a fragment of the screen
  res.send(
    renderLocationsPage(
      suggestedLocations,
      availableLocations,
      INTERESTING_LOCATIONS
    )
  );
});

app.post("/places", (req, res) => {
  const locationId = req.body.locationId;
  const location = AVAILABLE_LOCATIONS.find((loc) => loc.id === locationId);
  INTERESTING_LOCATIONS.push(location);

  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  const suggestedLocations = getSuggestedLocations();

  res.send(`
    ${renderLocationItem(location, false)}

    <ul
      hx-swap-oob="innerHTML"
      class="locations"
      id="suggested-locations"
    >
      ${suggestedLocations
        .map((location) => renderLocationItem(location))
        .join("")}
    </ul>

    <ul id="available-locations" class="locations" hx-swap-oob="true">
      ${availableLocations
        .map((location) => renderLocationItem(location))
        .join("")}
    </ul>
  `);
});

app.get("/suggested-locations", (req, res) => {
  const suggestedLocations = getSuggestedLocations();

  res.send(
    suggestedLocations.map((location) => renderLocationItem(location)).join("")
  );
});

app.delete("/places/:id", (req, res) => {
  const locationId = req.params.id;
  const locationIndex = INTERESTING_LOCATIONS.findIndex(
    (loc) => loc.id === locationId
  );
  INTERESTING_LOCATIONS.splice(locationIndex, 1);

  const availableLocations = AVAILABLE_LOCATIONS.filter(
    (location) => !INTERESTING_LOCATIONS.includes(location)
  );

  res.send(`
    <ul id="available-locations" class="locations" hx-swap-oob="true">
      ${availableLocations
        .map((location) => renderLocationItem(location))
        .join("")}
    </ul>
  `);
});

app.post("/validate", (req, res) => {
  if ("email" in req.body && !req.body.email.includes("@")) {
    return res.send(`
      E-Mail address is invalid.
    `);
  } else if ("email" in req.body && req.body.email.includes("@")) {
    return res.send();
  } else if ("password" in req.body && req.body.password.trim().length < 8) {
    return res.send(`
      Password must be at least 8 characters long.
    `);
  } else if ("password" in req.body && req.body.password.trim().length >= 8) {
    return res.send();
  }
  res.send();
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let errors: LoginError = {};

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password || password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    res.send(`
      <div id="extra-information">
        <ul id="form-errors">
          ${Object.keys(errors)
            .map((key) => `<li>${errors[key]}</li>`)
            .join("")}
        </ul>
      </div>
    `);
  }
  res.setHeader("HX-Redirect", "/authenticated");
  res.send();
});

app.listen(port, () => {
  return console.log(`listening at port: ${port}`);
});
