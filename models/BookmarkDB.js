"use strict"

var db = require("../db-connection");
const Bookmark = require("./Bookmark")

class BookmarkDB {
    getAllBookmarks(request, respond) {
        var sql = "SELECT * FROM bookmarks";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getBookmarks(request, respond) {
        var username = request.params.username;
        var sql = "SELECT restaurant FROM bookmarks WHERE username = ?";
        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    addBookmark(request, respond) {
        var bookmarkObject = new Bookmark(null, request.body.username, request.body.restaurant);
        var sql = "INSERT INTO bookmarks (username, restaurant) VALUES(?, ?)";

        var values = [bookmarkObject.getUsername(), bookmarkObject.getRestaurant()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}

module.exports = BookmarkDB;