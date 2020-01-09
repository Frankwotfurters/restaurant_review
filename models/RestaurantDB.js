"use strict"

var db = require("../db-connection");
const Restaurant = require("./Restaurant");

class RestaurantDB{
    getAllRestaurants(request, respond){
        var sql = "SELECT * FROM restaurant_details";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    addRestaurant(request, respond){
        var restaurantObject = new Restaurant(request.body.restaurant, request.body.address, request.body.website, 
                                            request.body.contact_number, request.body.thumbnail, null);
        var sql = "INSERT INTO restaurant_details (restaurant, address, website, contact_number, thumbnail) VALUES(?,?,?,?,?)";

        var values = [restaurantObject.getRestaurant(), restaurantObject.getAddress(), restaurantObject.getWebsite(),
                    restaurantObject.getContactNumber(), restaurantObject.getThumbnail()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    searchRestaurants(request, respond){
        var term = request.body.term;
        var order = request.body.order;
        var tag = request.body.tag;
        var sql =   "SELECT restaurant_details.restaurant, restaurant_details.average_rating, restaurant_details.thumbnail, tag_list.tag_name " +
                    "FROM ((tags " +
                    "INNER JOIN restaurant_details ON tags.restaurant = restaurant_details.restaurant) " +
                    "INNER JOIN tag_list ON tags.tag_id = tag_list.tag_id) ";
        if (term != null) {
            sql += "WHERE restaurant_details.restaurant LIKE '%' ? '%' ";

            if (tag != null) {
                sql += "AND tag_list.tag_name = " + tag;
            }
        }
        else if (tag != null) {
            sql += "WHERE tag_list.tag_name = " + tag;
        }

        if (order != null) {
        //if order is stated
            sql += " ORDER BY restaurant_details.average_rating " + order;
        }
        console.log(sql);
        db.query(sql, term, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    updateRatings(request, respond){
        var restaurant = request.params.restaurant;
        var sql =   "UPDATE restaurant_details " +
                    "SET average_rating = (SELECT AVG(rating) FROM reviews WHERE restaurant = ?) " +
                    "WHERE restaurant = ?";

        var values = [restaurant, restaurant];
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
}

module.exports = RestaurantDB;