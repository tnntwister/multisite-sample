const express = require("express");
const app = express();
const cors = require("cors");
const dotenvFlow = require("dotenv-flow");
const bodyParser = require("body-parser");

dotenvFlow.config();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static("./views"));

// app.use("/", routes);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  let content = {};
  if (req.get("host").includes("hostlockers")) {
    content.title = "HostLockers";
  } else if (req.get("host").includes("pharmalockers")) {
    content.title = "PharmaLockers";
  } else {
    content.title = "SmartLockers";
  }

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
