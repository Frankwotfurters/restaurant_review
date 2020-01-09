"use strict"

const commentsdb = require("../Models/CommentsDB");

var commentsDBObject = new commentsdb();

function routeComments(app) {
    app.route("/comments")
        .post(commentsDBObject.addComment)
        .get(commentsDBObject.getAllComments);
    app.route("/comments/:id")
        .delete(commentsDBObject.deleteComment)
        .put(commentsDBObject.updateComment);
}
module.exports = {routeComments};