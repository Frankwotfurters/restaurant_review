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
function editInfo() {
    var x = document.getElementsByClassName("input");
    for (var i = 0; i < x.length; i++) {
        if (x[i].disabled == true) {
            x[i].disabled = false;
        } else {
            x[i].disabled = true;
        }
    }
    if (document.getElementById("edit-button").innerHTML == "Save") {
        // document.getElementById("edit-button").innerHTML = "Edit profile";
        updateUserInfo();
    }
    else {
        document.getElementById("edit-button").innerHTML = "Save";
    }
}
function logOut() {
    localStorage.removeItem("username");
    window.location.href = "/index.html";
}
function deactivateAccount() {
    var deactivate = new Object();
    deactivate.username = localStorage.getItem("username");
    deactivate.activated = 0;
    //Create a GET Request to the URL /user/update/:username
    var request = new XMLHttpRequest();
    request.open("PUT", "/user/activate", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into user_array and call the function 
    request.onload = function () {
        alert(request.responseText);
        logOut();
    };
    request.send(JSON.stringify(deactivate));
}
function getUserInfo() {
    var username = getUrlVars();
    //Create a GET Request to the URL /user/:username
    var request = new XMLHttpRequest();
    request.open("GET", "/user/" + username["username"], true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into user_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into user_array (intialized in app.js)
        user_array = JSON.parse(request.responseText);
        document.getElementById("username").innerHTML = user_array[0].username;
        document.getElementById("name").value = user_array[0].first_name + " " + user_array[0].last_name;
        document.getElementById("gender").value = user_array[0].gender;
        document.getElementById("mobileNo").value = user_array[0].mobile_number;
        document.getElementById("address").value = user_array[0].postal_code;
        document.getElementById("email").value = user_array[0].email;
        document.getElementById("imgUpload").action = "/user/" + user_array[0].username + "/picture";
        console.log(dp);
        var dp = user_array[0].picture_url;
        if (dp != null) {
            document.getElementById("profile-picture").src = "./images/users/" + user_array[0].username + ".png";
        }
    };
    request.send();
}
function updateUserInfo() {
    var username = getUrlVars();
    var user = new Object();
    var full_name = document.getElementById("name").value;
    var name_array = full_name.split(" ");
    if (name_array.length == 3) {
        user.first_name = name_array[0] + " " + name_array[1];
    }
    else {
        user.first_name = name_array[0];
    }
    user.last_name = name_array[name_array.length - 1];
    user.gender = parseInt(document.getElementById("gender").value);
    user.mobile_number = document.getElementById("mobileNo").value;
    user.postal_code = document.getElementById("address").value;
    user.email = document.getElementById("email").value;
    //Create a GET Request to the URL /user/update/:username
    var request = new XMLHttpRequest();
    request.open("PUT", "/user/update/" + username["username"], true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into user_array and call the function 
    request.onload = function () {
        alert(request.responseText);
        location.reload();
    };
    request.send(JSON.stringify(user));
}
function test() {
    console.log(user_array);
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
//function to call get reviews API
function getReviews() {
    var username = getUrlVars();
    //Create a GET Request to the URL /review/restaurant/:restaurant
    var request = new XMLHttpRequest();
    request.open("GET", "/review/user/" + username["username"], true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into review_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into review_array (intialized in app.js)
        review_array = JSON.parse(request.responseText);
        //call displayReviews function
        displayReviews();
    };
    request.send();
}
//function to display reviews using data from review_array
function displayReviews() {
    //retrieve empty table element from Restaurant.html
    var table = document.getElementById('reviewTable');
    //empty the table if there are any existing restaurants showing
    table.innerHTML = '';
    if (review_array.length == 0) {
        var cell = formHTMLforReviewDisplay(null);
        table.insertAdjacentHTML('beforeEnd', cell);
    }
    //loop through all review information inside review_array
    for (var i = 0; i < review_array.length; i++) {
        //Call function formHTMLforReviewDisplay and parse in each review from array
        var cell = formHTMLforReviewDisplay(review_array[i]);
        //Insert the HTML into reviewTable div innerHTML
        //DOM manipulation to insert HTML into profile.html
        table.insertAdjacentHTML('beforeEnd', cell);
    }
}
function formHTMLforReviewDisplay(review) {
    if (review == null) {
        var cell = '<p class="center empty">No reviews yet!</p>';
        return cell;
    }
    var reviewID = review.review_id;
    var restaurantName = review.restaurant;
    var reviewComment = review.comment;
    var reviewRating = review.rating;
    var reviewImage = review.image_url;
    var reviewTimestamp = review.timestamp;
    var id = "/restaurant.html?restaurant=" + restaurantName;
    if (reviewImage == null) {
        var reviewImageDiv = '';
    }
    else {
        var reviewImageDiv = '<img class="review-image" src="images/uploads/' + reviewImage + '">';
    }
    if (localStorage.getItem("username") == getUrlVars()["username"]) {
        //If looking at your profile
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
        '<a href=' + encodeURI(id) + '><img class="thumbnail" name="' + restaurantName + '" src="./images/thumb.jpg"></a>' +
        '<p>' + restaurantName + '</p>' +
        '</div>' +
        '<div class="col-md-6 review-text">' +
        '<div class="rating">' +
        actions +
        formatReviewRating(reviewRating) +
        '<p class="timestamp">' + reviewTimestamp.slice(0, 10) + '</p>' +
        '</div>' +
        '<p class="review-text">' + reviewComment + '</p>' +
        '</div>' +
        '<div class="col-md-3">' +
        reviewImageDiv +
        '</div>' +
        '</div>'
    getRestaurantThumbnail(restaurantName);

    return cell;
}
function formatReviewRating(score) {
    var rating = '<img class="rating" src="images/rating.png">'
    var blank = '<img class="rating" src="images/blank.png">'
    return rating.repeat(score) + blank.repeat(5 - score);
}
//Store the review id of the review that user is trying to delete/edit
function setReviewID(id) {
    localStorage.setItem("review_id", id.replace(/[^\d.]/g, ''))
    getReview();
}
function clearReviewID() {
    localStorage.removeItem("review_id");
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
function getUserRating() {
    for (var i = 5; i > 0; i--) {
        if (document.getElementById(i - 1).src.endsWith("/images/rating.png")) {
            return i;
        }
    }
}
function checkOwner() {
    if (localStorage.getItem("username") != getUrlVars()["username"]) {
        //If looking at another user's account, remove edit profile, logout and delete buttons
        document.getElementById("edit-button").innerHTML = "";
        document.getElementById("logout").style.visibility = "hidden";
        document.getElementById("deleteAccount").style.visibility = "hidden";
        document.getElementById("imgUpload").style.visibility = "hidden";
    }
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
        location.reload();
    };
    request.send(JSON.stringify(review));
}
function getBookmarks() {
    //retrieve username from url
    var username = decodeURI(getUrlVars()["username"]);
    //perform GET request to URL “/bookmark/:username with the created object review
    var getBookmark = new XMLHttpRequest();
    getBookmark.open("GET", "/bookmark/" + username, true);
    getBookmark.setRequestHeader("Content-Type", "application/json");
    getBookmark.onload = function () {
        //insert bookmarks into bookmark_array
        bookmark_array = JSON.parse(getBookmark.responseText);
        displayBookmarkedRestaurants();
    }
    getBookmark.send();
}
//function to display bookmarked restaurants using data from bookmark_array
function displayBookmarkedRestaurants() {
    //retrieve empty table element from Restaurant.html
    var table = document.getElementById('bookmarkTable');
    //empty the table if there are any existing restaurants showing
    table.innerHTML = '';
    if (bookmark_array.length == 0) {
        var cell = formHTMLforDisplay(null);
        table.insertAdjacentHTML('beforeEnd', cell);
    }
    //loop through all restaurant information inside restaurant_array
    for (var i = 0; i < bookmark_array.length; i++) {
        //Call function formHTMLforDisplay and parse in each restaurant from array
        var cell = formHTMLforDisplay(bookmark_array[i]);
        //Insert the HTML into restaurantTable div innerHTML
        //DOM manipulation to insert HTML into Restaurant.html
        table.insertAdjacentHTML('beforeEnd', cell);
    }
}
var restaurant_array = [];
//Function to create the HTML display for 1 restaurant object retrieved from database
//This function can be reuse for every restaurants retrieve from database
function formHTMLforDisplay(restaurant) {
    if (restaurant == null) {
        var cell = '<p class="center empty book">No bookmarked restaurants!</p>';
        return cell;
    }
    var restaurantName = restaurant.restaurant;
    var id = "/restaurant.html?restaurant=" + restaurantName;

    //html to be inserted into the table stated in the previous function
    var cell =

        '<div class="col-md-4 restaurant-block center">' +
        '<div class="restaurant-info-block">' +
        '<a href="' + id + '">' +
        '<img class="thumbnail" name="' + restaurantName + '" src="./images/thumbnails/dtf.jpg">' +
        '</a>' +
        '<p><u>' + restaurantName + '</u></p>' +
        '<p class="tags" id="' + restaurantName + "Block" + '">' + getRestaurantTags(restaurantName) + '</p>' +
        '</div>' +
        '</div>'
    getRestaurantThumbnail(restaurantName);

    return cell;
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
        document.getElementById(restaurant + "Block").innerHTML = tag_list;
    };
    request.send();
}
function getBookmarkRestaurantThumbnail(restaurant) {
    //Create a GET Request to the URL '/tag/restaurant/:restaurant'
    var request = new XMLHttpRequest();

    request.open("GET", "/restaurant/thumb/" + restaurant, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, display a message and reload page
    request.onload = function () {
        var thumb = JSON.parse(request.responseText);
        var review_thumb = document.getElementsByClassName(restaurant + "Thumbnail");
        for (var i = 0; i < review_thumb.length; i++) {
            review_thumb[i].src = "./images/thumbnails/" + thumb[0].thumbnail;
            review_thumb[i].innerHTML = "";
        }
    };
    request.send();
}
function getRestaurantThumbnail(restaurant) {
    //Create a GET Request to the URL '/tag/restaurant/:restaurant'
    var request = new XMLHttpRequest();

    request.open("GET", "/restaurant/thumb/" + restaurant, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, display a message and reload page
    request.onload = function () {
        var thumb = JSON.parse(request.responseText);
        var thumbnails = document.getElementsByName(restaurant);
        for (var i = 0; i < thumbnails.length; i++) {
            thumbnails[i].src = "./images/thumbnails/" + thumb[0].thumbnail;
            thumbnails[i].innerHTML = "";
        }
        console.log(restaurant);
    };
    request.send();
}
function getUploaded() {
    var path = document.getElementById("editImgUpload").action.split("/");
    document.getElementById("editUploaded").innerHTML = path[path.length-1];
}
function changeProfilePicture() {
    var user = new Object();
    var username = localStorage.getItem("username");
    user.picture_url = username + ".png";

    var request = new XMLHttpRequest();

    request.open("PUT", "/user/" + username + "/picture", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, display a message and reload page
    request.onload = function () {
        location.reload();
    };
    request.send(JSON.stringify(user));
}