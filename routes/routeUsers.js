"use strict"

const userdb = require("../models/UserDB");

var userDBObject = new userdb();

function routeUsers(app){
    app.route("/user")
        .post(userDBObject.addUser);
    app.route("/user/:username")
        .get(userDBObject.getUser)
        .delete(userDBObject.deleteUser);
    app.route("/user/password")
        .put(userDBObject.changePassword);
    app.route("/user/activate")
        .put(userDBObject.setActivate);
    app.route("/email/:email")
        .get(userDBObject.checkEmail);
    app.route("/email/activate")
        .put(userDBObject.activateEmail);
    app.route("/user/update/:username")
        .put(userDBObject.updateInfo);
    app.route("/user/:username/picture")
        .put(userDBObject.updatePicture);
    app.route("/login")
        .post(userDBObject.getLoginCredentials);
    app.route("/recovery")
        .put(userDBObject.addRecoveryCode);
}

module.exports = {routeUsers};