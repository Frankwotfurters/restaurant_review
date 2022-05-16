var restaurantRating = "N/A";
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
function Print() {
    window.print();
}

//function to input rating
function rate(rating) {
    //set all to blank
    for (var i = 0; i < 5; i++) {
        document.getElementById(i).src = "./images/blank.png";
    }
    //set images to filled rating
    for (var i = 0; i <= rating; i++) {
        document.getElementById(i).src = "./images/rating.png";
    }
}
function reviewRate(rating) {
    //set all to blank
    for (var i = 0; i < 5; i++) {
        document.getElementById(i + 5).src = "./images/blank.png";
    }
    //set images to filled rating
    for (var i = 0; i <= rating; i++) {
        document.getElementById(i + 5).src = "./images/rating.png";
    }
}
function getUserReviewRating() {
    for (var i = 10; i > 5; i--) {
        if (document.getElementById(i - 1).src.endsWith("/images/rating.png")) {
            return i - 5;
        }
    }
}
function getUserRating() {
    for (var i = 5; i > 0; i--) {
        if (document.getElementById(i - 1).src.endsWith("/images/rating.png")) {
            return i;
        }
    }
}

//function to call restaurantDB list all restaurants API
function getRestaurant() {
    var restaurant = getUrlVars();
    //Create a GET Request to the URL /restaurant’
    var request = new XMLHttpRequest();
    request.open("GET", "/restaurant/" + restaurant["restaurant"], true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
        restaurant_array = JSON.parse(request.responseText);
        //call displaySearchRestaurant function
        displayDetails();
    };
    request.send();
}

function getRestaurantTags() {
    var restaurant = getUrlVars();
    //Create a GET Request to the URL /restaurant’
    var request = new XMLHttpRequest();
    request.open("GET", "/tag/restaurant/" + restaurant["restaurant"], true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
        var tag_array = JSON.parse(request.responseText);
        var tag_list = "";
        for (var i = 0; i < tag_array.length; i++) {
            tag_list += tag_array[i].tag_name + " ";
        }
        document.getElementById("tags").innerHTML = tag_list;
    };
    request.send();
}

//function to display search restaurant using data from restaurant_array
function displayDetails() {
    //retrieve empty table element from Restaurant.html
    var table = document.getElementById('ratingTable');
    //empty the table if there are any existing restaurants showing
    table.innerHTML = '';
    //Call function formHTMLforDisplay and parse in each restaurant from array
    var cell = formHTMLforDisplay(restaurant_array[0]);
    //Insert the HTML into restaurantTable div innerHTML
    //DOM manipulation to insert HTML into Restaurant.html
    table.insertAdjacentHTML('beforeEnd', cell);
}

function formHTMLforDisplay(restaurant) {
    var restaurantName = restaurant.restaurant;
    var restaurantAddress = restaurant.address;
    var restaurantContactNumber = restaurant.contact_number;
    if (restaurant.average_rating != null) {
        restaurantRating = restaurant.average_rating;
    }
    var id = "/restaurant.html?restaurant=" + restaurantName;
    document.getElementById("restaurant-name").innerHTML = restaurantName;
    document.getElementById("address").innerHTML = restaurantAddress;
    document.getElementById("contact_number").innerHTML = restaurantContactNumber;

    //html to be inserted into the table stated in the previous function
    var cell =

        formatRating(restaurantRating)

    return cell;
}

//function to call get reviews API
function getReviews() {
    var restaurant = getUrlVars();
    //Create a GET Request to the URL /review/restaurant/:restaurant
    var request = new XMLHttpRequest();
    request.open("GET", "/review/restaurant/" + restaurant["restaurant"], true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into review_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into review_array (intialized in app.js)
        review_array = JSON.parse(request.responseText);
        //call displayReviews function
        displayReviews();
        displayCarousel();
    };
    request.send();
}
//function to display reviews using data from review_array
function displayReviews() {
    //retrieve empty table element from Restaurant.html
    var table = document.getElementById('reviewTable');
    //empty the table if there are any existing restaurants showing
    table.innerHTML = '';
    document.getElementById("reviewNo").innerHTML = review_array.length + " reviews - Average rating of " + restaurantRating;
    //loop through all review information inside review_array
    for (var i = 0; i < review_array.length; i++) {
        //Call function formHTMLforReviewDisplay and parse in each review from array
        var cell = formHTMLforReviewDisplay(review_array[i]);
        //Insert the HTML into reviewTable div innerHTML
        //DOM manipulation to insert HTML into Restaurant.html
        table.insertAdjacentHTML('beforeEnd', cell);
    }
}
function formHTMLforReviewDisplay(review) {
    var reviewID = review.review_id;
    var reviewUsername = review.username;
    var reviewComment = review.comment;
    var reviewRating = review.rating;
    var reviewImage = review.image_url;
    var reviewTimestamp = review.timestamp;
    var id = "/profile.html?username=" + reviewUsername;

    if (reviewImage == null) {
        var reviewImageDiv = '';
    }
    else {
        var reviewImageDiv = '<img class="review-image" src="images/uploads/' + reviewImage + '">';
    }

    if (localStorage.getItem("username") == reviewUsername) {
        //If review is by you
        var actions = '<img data-toggle="modal" data-target="#deleteReviewModal" id="deleteReview' + reviewID + '" class="action" onclick="setReviewID(this.id)" src="images/delete.png">' +
            '<img data-toggle="modal" data-target="#editReviewModal" id="editReview' + reviewID + '" class="action" onclick="setReviewID(this.id)" src="images/edit.png">';
    }
    else {
        var actions = ""
    }
    //html to be inserted into the table stated in the previous function
    var cell =

        '<div class="row review-border">' +
        '<div class="col-md-3 center">' +
        '<a href="' + id + '"><img class="dp" src="./images/profile.jpg" name="' + reviewUsername + '"></a>' +
        setProfilePictures(reviewUsername) +
        '<p>' + reviewUsername + '</p>' +
        '</div>' +
        '<div class="col-md-6 review-text">' +
        '<div class="rating">' +
        formatReviewRating(reviewRating) +
        actions +
        '<p class="timestamp">' + reviewTimestamp.slice(0, 10) + '</p>' +
        '</div>' +
        '<p class="review-text">' + reviewComment + '</p>' +
        '</div>' +
        '<div class="col-md-3 center">' +
        reviewImageDiv +
        '</div>' +
        '</div>'

    return cell;
}

function formatReviewRating(score) {
    var rating = '<img class="rating" src="images/rating.png">'
    var blank = '<img class="rating" src="images/blank.png">'
    return rating.repeat(score) + blank.repeat(5 - score);
}
function formatRating(score) {
    var stars = (Math.round(score * 2)) / 2;
    var rating = '<img class="rating" src="images/rating.png">'
    var half = '<img class="rating" src="images/half.png">'
    var blank = '<img class="rating" src="images/blank.png">'
    var base = Math.floor(stars);
    var halfStar = Math.ceil(stars - base);

    return rating.repeat(base) + half.repeat(halfStar) + blank.repeat(5 - base - halfStar);
}

//function to retrieve user input and call add review function
function addReview() {
    //retrieve all data from restaurant.html
    var review = new Object();

    review.restaurant = decodeURI(getUrlVars()["restaurant"]);
    review.username = localStorage.getItem("username");
    review.comment = document.getElementById("comment").value;
    if (document.getElementById("uploaded").innerHTML == "") {
        review.image_url = null;
    }
    else {
        review.image_url = document.getElementById("uploaded").innerHTML;
    }
    review.rating = getUserReviewRating();

    if (review.rating == undefined) {
        alert("Please give a rating!")
    }
    else {
        //perform POST request to URL “/review with the created object review
        var addReview = new XMLHttpRequest();
        addReview.open("POST", "/review", true);
        addReview.setRequestHeader("Content-Type", "application/json");
        addReview.onload = function () {
            //display successful inserted message 
            alert(addReview.responseText);
            updateRatings();
            location.reload();
        }
        addReview.send(JSON.stringify(review));
    }
}
function updateRatings() {
    var restaurant = getUrlVars();
    //Create a PUT Request to the URL /updaterating/:restaurant
    var request = new XMLHttpRequest();
    request.open("PUT", "/updaterating/" + restaurant["restaurant"], true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into review_array and call the function 
    // request.onload = function () {
    // };
    request.send();
}
var bookmarked = false;

function checkBookmarked() {
    //retrieve username from localStorage
    var username = localStorage.getItem("username");;
    var restaurant = decodeURI(getUrlVars()["restaurant"]);
    //perform GET request to URL “/bookmark/:username with the created object review
    var getBookmark = new XMLHttpRequest();
    getBookmark.open("GET", "/bookmark/" + username, true);
    getBookmark.setRequestHeader("Content-Type", "application/json");
    getBookmark.onload = function () {
        //display successful inserted message 
        bookmark_array = JSON.parse(getBookmark.responseText);
        for (var i = 0; i < bookmark_array.length; i++) {
            if (bookmark_array[i].restaurant == restaurant) {
                bookmarked = true;
            }
        }
        if (bookmarked == true) {
            //If already bookmarked
            document.getElementById("bookmark").src = "images/assets/bookmarked.png";
            document.getElementById("bookmark").title = "Restaurant bookmarked!";
        }
    }
    getBookmark.send();
}
function bookmark() {
    if (bookmarked == false) {
        //If not bookmarked
        addBookmark();
    }
    else if (bookmarked == true) {
        //If already bookmarked
        deleteBookmark();
    }
}
function addBookmark() {
    //retrieve all data from restaurant.html
    var bookmark = new Object();

    bookmark.restaurant = decodeURI(getUrlVars()["restaurant"]);
    bookmark.username = localStorage.getItem("username");;

    //perform POST request to URL “/bookmark with the created object review
    var addBookmark = new XMLHttpRequest();
    addBookmark.open("POST", "/bookmark", true);
    addBookmark.setRequestHeader("Content-Type", "application/json");
    addBookmark.onload = function () {
        //display successful inserted message 
        alert(addBookmark.responseText);
        location.reload();
    }
    addBookmark.send(JSON.stringify(bookmark));
}
function deleteBookmark() {
    //retrieve all data from restaurant.html
    var bookmark = new Object();

    bookmark.restaurant = decodeURI(getUrlVars()["restaurant"]);
    bookmark.username = localStorage.getItem("username");;

    //perform POST request to URL “/bookmark with the created object review
    var deleteBookmark = new XMLHttpRequest();
    deleteBookmark.open("DELETE", "/bookmark", true);
    deleteBookmark.setRequestHeader("Content-Type", "application/json");
    deleteBookmark.onload = function () {
        //display successful inserted message 
        alert(deleteBookmark.responseText);
        location.reload();
    }
    deleteBookmark.send(JSON.stringify(bookmark));
}
function addRestaurant() {
    //retrieve all data from restaurant-registration.html
    var restaurant = new Object();

    restaurant.restaurant = document.getElementById("restaurant").value;
    restaurant.address = document.getElementById("address").value;
    restaurant.website = document.getElementById("website").value;
    restaurant.contact_number = document.getElementById("contact_number").value;
    restaurant.owner = localStorage.getItem("username");
    restaurant.thumbnail = document.getElementById("uploaded").innerHTML;

    if (!restaurant.restaurant.replace(/\s/g, '').length) {
        alert("Restaurant name cannot be empty!");
    }
    else if (document.getElementById("contact_number").value.length != 8) {
        alert("Contact number must be 8 characters long!")
    }
    else if (document.getElementById("uploaded").innerHTML == "") {
        alert("Please upload a thumbnail!")
    }
    else {
        //perform POST request to URL “/bookmark with the created object review
        var addRestaurant = new XMLHttpRequest();
        addRestaurant.open("POST", "/restaurant", true);
        addRestaurant.setRequestHeader("Content-Type", "application/json");
        addRestaurant.onload = function () {
            //display successful inserted message 
            var response = addRestaurant.responseText;
            alert(response);
            if (response.startsWith('"Added')) {
                addTags();
                window.location.href = "/restaurant.html?restaurant=" + encodeURI(restaurant.restaurant);
            }
        }
        addRestaurant.send(JSON.stringify(restaurant));
    }
}
function addTags() {
    var restaurant = document.getElementById("restaurant").value;
    var tag_array = document.getElementsByClassName("tags");
    var tag_list = [];
    var required = false;
    for (var i = 0; i < tag_array.length; i++) {
        if (tag_array[i].checked) {
            tag_list.push(tag_array[i].name);
            required = true;
        }
    }
    if (required) {
        for (var i = 0; i < tag_list.length; i++) {
            var tag = new Object();
            tag.restaurant = restaurant;
            tag.tag_name = tag_list[i];
            //Create a POST Request to the URL /tag
            var request = new XMLHttpRequest();
            request.open("POST", "/tag", true);
            request.setRequestHeader("Content-Type", "application/json");
            //On retrieved of data from backend, initialize the value into review_array and call the function 
            request.onload = function () {
                //retrieve response from API and parse the data into review_array (intialized in app.js)
                review_array = JSON.parse(request.responseText);
                //call displayReviews function
                displayReviews();
            };
            request.send(JSON.stringify(tag));
        }
    }
}
function getThumbName() {
    var restaurantName = document.getElementById("restaurant").value;
    document.getElementById("imgUpload").action = "/upload/" + restaurantName;
}
function getUploaded() {
    var restaurantName = document.getElementById("restaurant").value;
    document.getElementById("uploaded").innerHTML = restaurantName + ".png";
}
function getReviewThumbName() {
    String.prototype.hashCode = function () {
        var hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    var path = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    document.getElementById("imgUpload").action = "/review/upload/" + path;
}
function getReviewUploaded() {
    var path = document.getElementById("imgUpload").action.split("/");
    document.getElementById("uploaded").innerHTML = path[5] + ".png";
}
//function to call get reviews API
function getReview() {
    var review_id = localStorage.getItem("review_id");
    //Create a GET Request to the URL /review/restaurant/:restaurant
    var request = new XMLHttpRequest();
    request.open("GET", "/review/" + review_id, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into review_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into review_array (intialized in app.js)
        review_array = JSON.parse(request.responseText);
        document.getElementById("editComment").innerHTML = review_array[0].comment;
        rate(review_array[0].rating - 1);
        var current_image = review_array[0].image_url;
        document.getElementById("editUploaded").innerHTML = current_image;
        if (current_image != null) {
            document.getElementById("editImgUpload").action = "/edit/" + current_image;
        }
        else {
            String.prototype.hashCode = function () {
                var hash = 0, i, chr;
                if (this.length === 0) return hash;
                for (i = 0; i < this.length; i++) {
                    chr = this.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                return hash;
            };
            var path = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            document.getElementById("editImgUpload").action = "/review/upload/" + path;
        }
    };
    request.send();
}
//Store the review id of the review that user is trying to delete/edit
function setReviewID(id) {
    localStorage.setItem("review_id", id.replace(/[^\d.]/g, ''))
    getReview();
}
function clearReviewID() {
    localStorage.removeItem("review_id");
}
//function to delete a review
function deleteReview() {
    //Retrieve review id of review from localStorage
    var review_id = localStorage.getItem("review_id");
    //Create a DELETE Request to the URL '/review/:id’
    var request = new XMLHttpRequest();
    request.open("DELETE", "/review/" + review_id, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, display a message and reload page
    request.onload = function () {
        alert(request.responseText);
        location.reload();
    };
    request.send();
}
//function to delete a review
function editReview() {
    //Create a new review object
    var review = new Object();
    review.comment = document.getElementById("editComment").value;
    review.rating = getUserRating();    //Retrieve review id of review from localStorage
    review.image_url = document.getElementById("editUploaded").innerHTML;

    var review_id = localStorage.getItem("review_id");
    //Create a PUT Request to the URL '/review/:id’
    var request = new XMLHttpRequest();
    request.open("PUT", "/review/" + review_id, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, display a message and reload page
    request.onload = function () {
        alert(request.responseText);
        updateRatings();
        location.reload();
    };
    request.send(JSON.stringify(review));
}
var dp_array = [];
function setProfilePictures(username) {
    var request = new XMLHttpRequest();
    request.open("GET", "/user/" + username, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, display a message and reload page
    request.onload = function () {
        dp_array = JSON.parse(request.responseText);
        var dp = document.getElementsByName(username);
        for (var i = 0; i < dp.length; i++) {
            if (dp_array[0].picture_url != null) {
                dp[i].src = "./images/users/" + dp_array[0].picture_url;
            }
            else {
                dp[i].src = "./images/profile.jpg";
            }
        }
    };
    request.send();
    return "";
}
function getEditUploaded() {
    var path = document.getElementById("editImgUpload").action.split("/");
    document.getElementById("editUploaded").innerHTML = path[path.length - 1];
}
//function to display reviews images in the carousel using data from review_array
function displayCarousel() {
    //retrieve empty table element from Restaurant.html
    var table = document.getElementById('carouselTable');
    var dotTable = document.getElementById("carouselDotTable");
    //empty the table if there are any existing restaurants showing
    table.innerHTML = '';
    dotTable.innerHTML = '';
    console.log(table.innerHTML)
    //loop through all review information inside review_array
    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].image_url != null) {
            //Call function only if the review has an image
            var cell = formHTMLforCarouselDisplay(review_array[i]);
            //Insert the HTML into reviewTable div innerHTML
            //DOM manipulation to insert HTML into Restaurant.html
            if (dotTable.innerHTML == "") {
                var dotCell = '<li data-target="#demo" data-slide-to="0" class="active"></li>'
            }
            else {
                var dotCell = '<li data-target="#demo" data-slide-to="0"></li>'

            }
            table.insertAdjacentHTML('beforeEnd', cell);
            dotTable.insertAdjacentHTML('beforeEnd', dotCell);
        }
    }
    if (table.innerHTML == "") {
        //If carousel still empty
        table.innerHTML = '<div class="blank"><p class="blank">No review images uploaded yet!</p></div>';
    }
}
function formHTMLforCarouselDisplay(review) {
    var reviewImage = review.image_url;
    console.log(document.getElementById("carouselTable").innerHTML);
    if (document.getElementById("carouselTable").innerHTML == "") {
        var active = "active";
    }
    else {
        var active = "";
    }

    //html to be inserted into the table stated in the previous function
    var cell =

        '<div class="carousel-item ' + active + '">' +
        '<img src="./images/uploads/' + reviewImage + '" alt="image">' +
        '</div>'

    return cell;
}