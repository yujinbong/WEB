

var express = require("express");
var app = express();
var path = require("path");
const { nextTick } = require("process");

app.use(express.static("public"));
var HTTP_PORT = process.env.PORT || 8080;

// The route "/" must return the home.html file from the views folder
app.get("/", function (req, res) {
    console.log("homepage");
    res.sendFile(path.join(__dirname, "public/html/home.html"));
});

// The route "/about" must return the about.html file from the views folder
app.get("/plans", function (req, res) {
    console.log("plans");
  res.sendFile(path.join(__dirname, "public/html/cwh.html"));
});

// The route "/about" must return the about.html file from the views folder
app.get("/registration", function (req, res) {
    console.log("registragtion");
    res.sendFile(path.join(__dirname, "public/html/registration.html"));
  });

  // The route "/about" must return the about.html file from the views folder
app.get("/login", function (req, res) {
    console.log("login");
    res.sendFile(path.join(__dirname, "public/html/login.html"));
  });



  app.listen(HTTP_PORT, function(){
    console.log(`server listening on: ${8080}`);
});
