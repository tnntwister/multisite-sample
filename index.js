const express = require("express");
const app = express();
const cors = require("cors");
const dotenvFlow = require("dotenv-flow");
const bodyParser = require("body-parser");
const axios = require("axios").default;

dotenvFlow.config();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static("./views"));

// app.use("/", routes);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  // var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  var entreprise = "";
  var content = {};
  content.title = "multisite essai";
  if (req.get("host").includes("hostlockers")) {
    entreprise = "HostLockers";
  } else if (req.get("host").includes("pharmalockers")) {
    entreprise = "PharmaLockers";
  } else {
    entreprise = "SmartLockers";
  }

  const result = await axios.get(
    "https://api.dev.smartlockers.io/api/v2.0/translation/static/fr"
  );

  content.texts = result.data;

  const entrepriseResult = await axios.get(
    "https://api.dev.smartlockers.io/api/v2.0/entreprise/byName/SmartLOCKERS"
  );

  content.entreprise = entrepriseResult.data.data;
  // console.log(content.entreprise);
  res.render("index", content);
});

app.get("/magic", function (req, res) {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(req.get("host"));
  res.render("pharmalockers/index.html");
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Can't find " + req.originalUrl + " on this server!",
  });
});

app.listen(3000, () => console.log("Server is running..."));
