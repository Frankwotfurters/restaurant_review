"use strict"

const moviedb = require("../Models/MovieDB");

var movieDBObject = new moviedb();

function routeMovies(app) {
    app.route("/movies")
        .get(movieDBObject.getAllMovies);
}
module.exports = {routeMovies};