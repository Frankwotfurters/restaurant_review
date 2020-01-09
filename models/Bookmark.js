"use strict"

class Bookmark {
    constructor(bookmark_id, username, restaurant) {
        this.bookmark_id = bookmark_id;
        this.username = username;
        this.restaurant = restaurant;
    }
    //Getters
    getBookmarkId() {
        return this.bookmark_id;
    }
    getUsername() {
        return this.username;
    }
    getRestaurant() {
        return this.restaurant;
    }
}

module.exports = Bookmark;