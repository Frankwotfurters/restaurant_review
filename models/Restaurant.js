"use strict"

class Restaurant {
    constructor(restaurant, address, website, contact_number, thumbnail, average_rating) {
        this.restaurant = restaurant;
        this.address = address;
        this.website = website;
        this.contact_number = contact_number;
        this.thumbnail = thumbnail;
        this.average_rating = average_rating;
    }
    //Getters
    getRestaurant() {
        return this.restaurant;
    }
    getAddress() {
        return this.address;
    }
    getWebsite() {
        return this.website;
    }
    getContactNumber() {
        return this.contact_number;
    }
    getThumbnail() {
        return this.thumbnail;
    }
    getAverageRating() {
        return this.average_rating;
    }
}

module.exports = Restaurant;