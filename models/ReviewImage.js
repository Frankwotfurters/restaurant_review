"use strict"

class ReviewImage {
    constructor(image_id, review_id, image_url) {
        this.image_id = image_id;
        this.review_id = review_id;
        this.image_url = image_url;
    }
    //Getters
    getImageId() {
        return this.image_id;
    }
    getReviewId() {
        return this.review_id;
    }
    getImageUrl() {
        return this.image_url;
    }
}

module.exports = ReviewImage;