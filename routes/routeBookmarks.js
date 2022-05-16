"use strict"

const bookmarkdb = require("../models/BookmarkDB");

var bookmarkDBObject = new bookmarkdb();

function routeBookmarks(app){
    app.route("/bookmark")
        .get(bookmarkDBObject.getAllBookmarks)
        .post(bookmarkDBObject.addBookmark)
        .delete(bookmarkDBObject.deleteBookmark);
    app.route("/bookmark/:username")
        .get(bookmarkDBObject.getBookmarks);
}

module.exports = {routeBookmarks};