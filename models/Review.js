"use strict";
class Review {
    constructor(review_id, restaurant, rating, comment, username, timestamp) {
        this.review_id = review_id;
        this.restaurant = restaurant;
        this.rating = rating;
        this.comment = comment;
        this.username = username;
        this.timestamp = timestamp;
    }
    //Getters
    getReviewId() {
        return this.review_id;
    }
    getRestaurant() {
        return this.restaurant;
    }
    getRating() {
        return this.rating;
    }
    getComment() {
        return this.comment;
    }
    getUsername() {
        return this.username;
    }
    getTimestamp() {
        return this.timestamp;
    }
}
module.exports = Review;
