// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const timeParser = (req, res, next) => {
  const { time } = req.params;
  const parsedTime = /^\d{1,}$/.test(time)
    ? new Date(Number(time))
    : !time
    ? new Date()
    : new Date(time);
  req.parsedTime = parsedTime;
  next();
};

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:time?", timeParser, (req, res) => {
  if (req.parsedTime.toUTCString() === "Invalid Date")
    res.json({ error: "Invalid Date" });
  res.json({
    unix: req.parsedTime.getTime(),
    utc: req.parsedTime.toUTCString(),
  });
});

const port = process.env.PORT || 3000;
// listen for requests :)

var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
