const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "app", "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "app", "build", "index.html"));
});

app.listen(4200);
