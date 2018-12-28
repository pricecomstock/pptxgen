var express = require("express");
var api = require("./router.js").router;
var serveStatic = require("serve-static");

var app = express();
app.use(serveStatic(__dirname + "/dist"));

// This is for development mostly
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Use all those above routes for the API
app.use("/api", api);

// TODO: make it so incorrect API calls don't fall through to vue-router

// Favicon
app.get("/favicon.ico", function(req, res) {
  //   console.log("favicon GET");
  res.sendFile(__dirname + "/dist/favicon.ico");
});

// Everything else should fall through to vue-router
app.get("/*", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

var port = process.env.PORT || 5000;
app.listen(port);

// console.log("server started " + port);
