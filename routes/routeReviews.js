"use strict"

const reviewdb = require("../models/ReviewDB");

var reviewDBObject = new reviewdb();

function routeReviews(app){
    app.route("/review")
        .get(reviewDBObject.getAllReviews)
        .post(reviewDBObject.addReview);
    app.route("/review/:id")
        .get(reviewDBObject.getReview)
        .delete(reviewDBObject.deleteReview)
        .put(reviewDBObject.updateReview);
    app.route("/review/restaurant/:restaurant")
        .get(reviewDBObject.getRestaurantReviews);
    app.route("/review/user/:username")
        .get(reviewDBObject.getUserReviews);
}

module.exports = {routeReviews};