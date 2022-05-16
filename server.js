"use strict";

//routes
const routeUsers = require("./routes/routeUsers");
const routeRestaurants = require("./routes/routeRestaurants");
const routeReviews = require("./routes/routeReviews");
const routeTags = require("./routes/routeTags");
const routeTagLists = require("./routes/routeTagLists");
const routeBookmarks = require("./routes/routeBookmarks");

const express = require("express");
const bodyParser = require("body-parser");
const routeImages= require("./routes/routeImages");

const http = require("http");
const path = require("path");
const fs = require("fs");

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "index.html";

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app routes
routeUsers.routeUsers(app);
routeRestaurants.routeRestaurants(app);
routeReviews.routeReviews(app);
routeTags.routeTags(app);
routeTagLists.routeTagLists(app);
routeBookmarks.routeBookmarks(app);
routeImages.routeImages(app, path, fs);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", express.static(path.join(__dirname, "./public")));