/**
 * This is a simple express server, to show how to proxy weather rquest to DarkSky API.
 */
require("dotenv").load();
var express = require("express");
var bodyParser = require("body-parser");
require("es6-promise").polyfill();
require("isomorphic-fetch");

var axios = require("axios");
var cors = require("cors");

var port = 3001;

// Configure app to use bodyParser to parse json data
var app = express();
var server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

// Test server is working (GET http://localhost:3001/api)
app.get("/api/", function(req, res) {
  res.json({ message: "Hi, welcome to the server api!" });
});

// Following is an example to proxy client request to DarkSky forecast API
// Please use your own darksky secret key.
// Get one for free at https://darksky.net/dev/
// DarkSky returns 403 (forbidden) error for invalid key.

var url_prefix =
  "https://api.darksky.net/forecast/" +
  `${process.env.DARKSKY_SECRET_KEY}` +
  "/";
app.get("/api/darksky", function(req, res) {
  // Retrieves location coordinates (latitude and longitude) from client request query
  var coordinates = "47.6062,122.3321";
  var url = url_prefix + coordinates;
  console.log("Fetching " + url);

  axios.get(url).then(retrievedDataFromDarkSky => {
    console.log(retrievedDataFromDarkSky.data);
    res.status(200);
    res.send(retrievedDataFromDarkSky.data);
  });
});

// Start the server
server.listen(port);
console.log("Server is listening on port " + port);
