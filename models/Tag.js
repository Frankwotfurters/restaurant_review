"use strict"

class Tag {
    constructor(row_id, restaurant, tag_id) {
        this.row_id = row_id;
        this.restaurant = restaurant;
        this.tag_id = tag_id;
    }
    //Getters
    getRowId() {
        return this.row_id;
    }
    getRestaurant() {
        return this.restaurant;
    }
    getTagId() {
        return this.tag_id;
    }
}

module.exports = Tag;