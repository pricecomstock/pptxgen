require("dotenv").config();
var express = require("express");
var api = require("./router").router;
var serveStatic = require("serve-static");
import * as path from "path";

const distDir = path.join(process.cwd(), "dist");

var app = express();
app.use(serveStatic(distDir));
app.use("/textures", serveStatic(distDir + "/textures"));

// This is for development mostly
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Use all those above routes for the API
app.use("/api", api);

// Favicon
app.get("/favicon.ico", function (req, res) {
  //   console.log("favicon GET");
  res.sendFile(distDir + "/favicon.ico");
});

// Everything else should fall through to vue-router
app.get("/*", function (req, res) {
  res.sendFile(distDir + "/index.html");
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log(`server started on port ${port}`);
