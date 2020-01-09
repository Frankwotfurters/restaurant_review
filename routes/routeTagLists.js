"use strict"

const taglistdb = require("../models/TagListDB");

var taglistDBObject = new taglistdb();

function routeTagLists(app){
    app.route("/tag_list")
        .get(taglistDBObject.getTagList);
}

module.exports = {routeTagLists};