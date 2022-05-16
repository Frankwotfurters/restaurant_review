function checkSession() {
    var username = localStorage.getItem("username");
    if (username == null) {
        //If not logged in
        document.getElementById("userSession").innerHTML = "";
        document.getElementById("profile").innerHTML = "";
        document.getElementById("register").innerHTML = "";
    }
    else {
        //If logged in
        var id = "/profile.html?username=" + username;
        document.getElementById("userSession").innerHTML = "Welcome back, " + "<br>" + username + "!";
        document.getElementById("profileHref").href = id;
        document.getElementById("login").innerHTML = "";
        document.getElementById("signup").innerHTML = "";
    }
}
function checkRestaurantSession() {
    var username = localStorage.getItem("username");
    if (username == null) {
        //If not logged in
        document.getElementById("bookmark").style.visibility = "hidden";
        for (var i = 1; i < 6; i++) {
            document.getElementById("postReview" + i).style.display = "none";
        }
    }
}
function checkRestaurantOwner(owner) {
    var username = localStorage.getItem("username");
    if (username == owner) {
        document.getElementById("b").innerHTML = "a";
    }
}