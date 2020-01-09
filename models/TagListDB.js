"use strict"

var db = require("../db-connection");
const TagList = require("./TagList")

class TagListDB {
    getTagList(request, respond) {
        var sql = "SELECT * FROM tag_list";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}
module.exports = TagListDB;