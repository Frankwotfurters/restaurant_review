"use strict"

var db = require("../db-connection");
const ReviewImage = require("./ReviewImage")

class ReviewImageDB {
    getAllImages(request, respond) {
        var sql = "SELECT * FROM review_images";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getReviewImages(request, respond) {
        var review_id = request.params.review_id;
        var sql = "SELECT image_url FROM review_images WHERE review_id = ?";
        db.query(sql, review_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getRestaurantImages(request, respond) {
        var restaurant = request.params.restaurant;
        var sql = "SELECT review_images.image_url FROM (review_images INNER JOIN reviews ON reviews.review_id = review_images.review_id) WHERE reviews.restaurant = ?";
        db.query(sql, restaurant, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    addReviewImages(request, respond) {
        var review_id = request.params.review_id;
        var reviewImageObject = new ReviewImage(null, review_id, request.body.image_url);
        var sql = "INSERT INTO review_images (review_id, image_url) VALUES(?, ?)";

        var values = [reviewImageObject.getReviewId(), reviewImageObject.getImageUrl()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    deleteReviewImages(request, respond) {
        var image_url = request.body.image_url;
        var sql = "DELETE FROM review_images WHERE image_url = ?";

        db.query(sql, image_url, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}

module.exports = ReviewImageDB;