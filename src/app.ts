import express from "express";
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/info", (req, res) => {
  const infoList: string[] = [
    "This is an example",
    "About how to display",
    "An array",
  ];

  res.send(`
    <ul>
      ${infoList.map((info) => `<li>${info}</li>`).join("")}
    </ul>
  `);
});

app.listen(port, () => {
  return console.log(`listening at port: ${port}`);
});
