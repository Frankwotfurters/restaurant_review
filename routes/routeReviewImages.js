"use strict"

const reviewimagedb = require("../models/ReviewImageDB");

var reviewimageDBObject = new reviewimagedb();

function routeReviewImages(app){
    app.route("/image")
        .get(reviewimageDBObject.getAllImages);
    app.route("/image/delete")
        .delete(reviewimageDBObject.deleteReviewImages);
    app.route("/image/review/:review_id")
        .get(reviewimageDBObject.getReviewImages)
        .post(reviewimageDBObject.addReviewImages);
    app.route("/image/restaurant/:restaurant")
        .get(reviewimageDBObject.getRestaurantImages);
}

module.exports = {routeReviewImages};