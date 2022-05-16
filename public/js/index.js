// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    mybutton = document.getElementById("toTop");
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

var restaurant_array = [];
var modified = [];

//function to call restaurantDB list all restaurants API
function listAllRestaurants() {

    //Create a GET Request to the URL /restaurant’
    var request = new XMLHttpRequest();
    request.open("PUT", "/restaurant/search", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
        restaurant_array = formatRestaurantArray(JSON.parse(request.responseText));
        //call displaySearchRestaurant function
        displaySearchRestaurant();
    };
    request.send();
}

//function to call restaurantDB search API
function search() {
    //Retrieve search term from Restaurant.html of element with id= searchTerm
    var searchTerm = new Object();
    searchTerm.term = document.getElementById('search').value;

    var tagDropdown = document.getElementById("tag");
    if (tagDropdown.options[tagDropdown.selectedIndex].value > 0) {
        searchTerm.tag = '"' + tagDropdown.options[tagDropdown.selectedIndex].text + '"';
    }

    var orderDropdown = document.getElementById("order");
    if (orderDropdown.options[orderDropdown.selectedIndex].value != "null") {
        searchTerm.order = orderDropdown.options[orderDropdown.selectedIndex].value;
    }
    //Create a GET Request to the URL ‘searchRestaurant/name’
    var request = new XMLHttpRequest();
    request.open("PUT", "/restaurant/search", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
        restaurant_array = formatRestaurantArray(JSON.parse(request.responseText));
        displaySearchRestaurant();
        location.href = "#explore";
    };
    request.send(JSON.stringify(searchTerm));
}
function formatRestaurantArray(raw) {
    //Function to remove duplicate restaurant entries
    var modified = [];
    modified.push(raw[0]);
    //Append the first restaurant
    for (var i = 1; i < raw.length; i++) {
        //For every entry in the original array
        var dupe = false
        for (var j = 0; j < modified.length; j++) {
            //Check if it is already existing in the modified array before appending
            if (raw[i].restaurant == modified[j].restaurant) {
                dupe = true;
                break;
            }
        }
        if (dupe == false) {
            //Only append if it is not a duplicate entry
            modified.push(raw[i]);
        }
    }
    return modified
}
function getRestaurantTags(restaurant) {
    //Create a GET Request to the URL '/tag/restaurant/:restaurant'
    var request = new XMLHttpRequest();

    request.open("GET", "/tag/restaurant/" + restaurant, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, display a message and reload page
    request.onload = function () {
        var tag_array = JSON.parse(request.responseText);
        var tag_list = "";
        for (var i = 0; i < tag_array.length; i++) {
            tag_list += tag_array[i].tag_name + " ";
        }
        document.getElementById(restaurant + "Tags").innerHTML = tag_list;
    };
    request.send();
}
function test() {
    //To make a new array and make sure duplicate entries and combined
    modified_restaurant_array.push(restaurant_array[0]);
    for (var i = 1; i < restaurant_array.length; i++) {
        console.log(restaurant_array[i]);
        //For every restaurant in search result,
        //check if the restaurant is already in the new array
        for (var j = 0; j < modified_restaurant_array.length; j++) {
            //For every entry in the new array, check if the restaurant is already in
            if (modified_restaurant_array[j].restaurant == restaurant_array[i].restaurant) {
                //If duplicate entry
                modified_restaurant_array[j].tag_name += (" " + restaurant_array[i].tag_name);
            }
            else {
                //If new entry, just append
                modified_restaurant_array.push(restaurant_array[i]);
            }
        }
    }
    console.log(modified_restaurant_array);
}

//function to display search restaurant using data from restaurant_array
function displaySearchRestaurant() {
    //retrieve empty table element from Restaurant.html
    var table = document.getElementById('restaurantTable');
    //empty the table if there are any existing restaurants showing
    table.innerHTML = '';
    //loop through all restaurant information inside restaurant_array
    for (var i = 0; i < restaurant_array.length; i++) {
        //Call function formHTMLforDisplay and parse in each restaurant from array
        var cell = formHTMLforDisplay(restaurant_array[i]);
        getRestaurantTags(restaurant_array[i].restaurant);
        //Insert the HTML into restaurantTable div innerHTML
        //DOM manipulation to insert HTML into Restaurant.html
        table.insertAdjacentHTML('beforeEnd', cell);
    }
}

//Function to create the HTML display for 1 restaurant object retrieved from database
//This function can be reuse for every restaurants retrieve from database
function formHTMLforDisplay(restaurant) {
    var restaurantName = restaurant.restaurant;
    var restaurantTags = restaurant.tag_name;
    var restaurantRating = restaurant.average_rating;
    if (restaurant.thumbnail != null) {
        var restaurantThumbnail = restaurant.thumbnail;
    }
    else {
        var restaurantThumbnail = "default.png";
    }
    var id = "/restaurant.html?restaurant=" + restaurantName;

    //html to be inserted into the table stated in the previous function
    var cell =

        '<div class="col-md-4 restaurant-block center">' +
        '<div class="restaurant-info">' +
        '<a href=' + encodeURI(id) + '>' +
        '<img class="thumbnail" src="./images/thumbnails/' + restaurantThumbnail + '">' +
        '</a>' +
        '<p><u>' + restaurantName + '</u></p>' +
        '<div class="rating">' +
        formatRating(restaurantRating) +
        '</div>' +
        '<p class="tags" id="' + restaurantName + "Tags" + '">' + restaurantTags + '</p>' +
        '</div>' +
        '</div>'

    return cell;
}
function formatRating(score) {
    var stars = (Math.round(score * 2)) / 2;
    var rating = '<img src="images/rating.png">'
    var half = '<img src="images/half.png">'
    var blank = '<img src="images/blank.png">'
    var base = Math.floor(stars);
    var halfStar = Math.ceil(stars - base);

    return rating.repeat(base) + half.repeat(halfStar) + blank.repeat(5 - base - halfStar);
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}