"use strict"
var db = require("../db-connection");

class MovieDB{
    getAllMovies(request, respond) {
        var sql = "SELECT * FROM movie_review.movie";
        db.query(sql, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}

module.exports = MovieDB;