"use strict"

class TagList {
    constructor(tag_id, tag_name) {
        this.tag_id = tag_id;
        this.tag_name = tag_name;
    }
    //Getters
    getTagId() {
        return this.tag_id;
    }
    getTagName() {
        return this.tag_name;
    }
}

module.exports = TagList;