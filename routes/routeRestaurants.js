"use strict"

const restaurantdb = require("../models/RestaurantDB");

var restaurantDBObject = new restaurantdb();

function routeRestaurants(app){
    app.route("/restaurant")
        .get(restaurantDBObject.getAllRestaurants)
        .post(restaurantDBObject.addRestaurant);
    app.route("/restaurant/:restaurant")
        .get(restaurantDBObject.getRestaurantInfo);
    app.route("/restaurant/thumb/:restaurant")
        .get(restaurantDBObject.getThumbnail);
    app.route("/restaurant/search")
        .put(restaurantDBObject.searchRestaurants);
    app.route("/updaterating/:restaurant")
        .put(restaurantDBObject.updateRatings);
}

module.exports = {routeRestaurants};