const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.use(morgan("dev"));
app.use(cors({
  origin: true
}));

app.use(express.static(path.join(__dirname, "build")));

app.get("/login", function(req, res) {
  if (req != undefined && req.query != undefined && req.query.code != undefined) {
    res.send(req.query)
  } else {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  }
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(4200);
