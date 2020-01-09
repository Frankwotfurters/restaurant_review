"use strict"

var db = require("../db-connection");
const Review = require("./Review");

class ReviewDB {
    getAllReviews(request, respond) {
        var sql = "SELECT * FROM reviews";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getReview(request, respond) {
        var review_id = request.params.id;
        var sql = "SELECT * FROM reviews WHERE review_id = ?";
        db.query(sql, review_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getRestaurantReviews(request, respond) {
        var restaurant = request.params.restaurant;
        var sql = "SELECT * FROM reviews WHERE restaurant = ?";
        db.query(sql, restaurant, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getUserReviews(request, respond) {
        var username = request.params.username;
        var sql = "SELECT * FROM reviews WHERE username = ?";
        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    addReview(request, respond) {
        var reviewObject = new Review(null, request.body.restaurant, request.body.rating, request.body.comment,
                                    request.body.username, null);
        var sql = "INSERT INTO reviews (restaurant, rating, comment, username, timestamp) VALUES(?,?,?,?,NOW())";

        var values = [reviewObject.getRestaurant(), reviewObject.getRating(),
                    reviewObject.getComment(), reviewObject.getUsername()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    updateReview(request, respond) {

        var reviewObject = new Review(request.params.id, null, request.body.rating, request.body.comment,
            null, null);

        var sql = "UPDATE reviews SET comment = ?, rating = ?, timestamp = NOW() WHERE review_id = ?";
        var values = [reviewObject.getComment(), reviewObject.getRating(), reviewObject.getReviewId()];
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    deleteReview(request, respond) {
        var review_id = request.params.id;
        var sql = "DELETE FROM reviews WHERE review_id = ?";
        db.query(sql, review_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }


}

module.exports = ReviewDB;