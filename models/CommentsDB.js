"use strict"

var db = require("../db-connection");
const Comment = require("../Models/Comment");

class CommentsDB {

    getAllComments(request, respond) {
        var sql = "SELECT * FROM movie_review.comment";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    addComment(request, respond) {
        var now = new Date();
        var commentObject = new Comment(null, request.body.movieId, request.body.movie, request.body.review,
            request.body.username, request.body.rating, now.toString());
        var sql = "INSERT INTO movie_review.comment (movieId, movie, review, username, rating, datePosted) VALUES(?,?,?,?,?,?)";
        var values = [commentObject.getMovieId(), commentObject.getMovie(), commentObject.getReview(),
        commentObject.getUsername(), commentObject.getRating(), commentObject.getDatePosted()];
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateComment(request, respond) {
        var now = new Date();

        var commentObject = new Comment(request.params.id, request.body.movieId, request.body.movie, request.body.review,
            request.body.username, request.body.rating, now.toString());

        var sql = "UPDATE movie_review.comment SET review = ?, rating = ?, datePosted= ? WHERE _id = ?";
        var values = [commentObject.getReview(), commentObject.getRating(), commentObject.getDatePosted(), commentObject.getId()];
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteComment(request, respond) {
        var commentID = request.params.id;
        var sql = "DELETE FROM movie_review.comment WHERE _id = ?";
        db.query(sql, commentID, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }


}
module.exports = CommentsDB;