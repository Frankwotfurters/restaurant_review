"use strict"

const tagdb = require("../models/TagDB");

var tagDBObject = new tagdb();

function routeTags(app){
    app.route("/tag")
        .get(tagDBObject.getAllTags)
        .post(tagDBObject.addTag);
    app.route("/tag/restaurant/:restaurant")
        .get(tagDBObject.getTags);
    app.route("/tag/:tag")
        .get(tagDBObject.getRestaurants);
}

module.exports = {routeTags};