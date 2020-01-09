"use strict";

//routes
const routeUsers = require("./routes/routeUsers");
const routeRestaurants = require("./routes/routeRestaurants");
const routeReviews = require("./routes/routeReviews");
const routeTags = require("./routes/routeTags");
const routeTagLists = require("./routes/routeTagLists");
const routeBookmarks = require("./routes/routeBookmarks");
const routeReviewImages = require("./routes/routeReviewImages");

const express = require("express");
const routeMovies= require("./routes/routeMovies")
const routeComments = require("./routes/routeComments");
const bodyParser = require("body-parser");
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
routeReviewImages.routeReviewImages(app);

routeMovies.routeMovies(app);
routeComments.routeComments(app);

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
