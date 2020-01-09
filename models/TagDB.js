"use strict"

var db = require("../db-connection");
const Tag = require("./Tag")

class TagDB {
    getAllTags(request, respond) {
        var sql = "SELECT * FROM tags";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    addTag(request, respond) {
        var restaurant = request.body.restaurant;
        var tag_name = request.body.tag_name;
        var sql =   "INSERT INTO tags (restaurant, tag_id) " +
                    "VALUES (?, (SELECT tag_id FROM tag_list WHERE tag_name = ?))";

        var values = [restaurant, tag_name]

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getTags(request, respond) {
        var restaurant = request.params.restaurant;
        var sql = "SELECT tag_list.tag_name FROM (tags INNER JOIN tag_list ON tags.tag_id = tag_list.tag_id) WHERE tags.restaurant = ?";
        var values = [restaurant];
        db.query(sql, restaurant, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    getRestaurants(request, respond) {
        var tag = request.params.tag;
        var sql = "SELECT tags.restaurant FROM (tags INNER JOIN tag_list ON tags.tag_id = tag_list.tag_id) WHERE tag_list.tag_name = ?";
        db.query(sql, tag, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}

module.exports = TagDB;