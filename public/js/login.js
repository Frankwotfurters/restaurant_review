function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

$(document).ready(function ($) {
    $('#password').strength({
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
        strengthButtonText: 'Show Password',
        strengthButtonTextToggle: 'Hide Password'
    });
});

//function to call login API
function login() {
    //Retrieve search term from Restaurant.html of element with id= searchTerm
    var login = new Object();
    login.username = document.getElementById('username').value;
    login.password = document.getElementById('password').value;
    //Create a GET Request to the URL ‘searchRestaurant/name’
    var request = new XMLHttpRequest();
    request.open("POST", "/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
        var response = JSON.parse(request.responseText);
        alert(response);
        if (response.startsWith("SUCCESS! Welcome ")) {
            //Successful login
            localStorage.setItem("username", login.username)
            window.location.href = "/index.html"
        }
        else if (response == "Please activate your account") {
            //Successful login into unactivated accountgin.username);
            window.location.href = "/activate.html"
        }
        else if (response == "FAIL! Password incorrect!") {
            //Wrong password
        }
        else if (response == "USER NOT FOUND!") {
            //No user found
        }
    };
    request.send(JSON.stringify(login));
}
function sendRecoveryEmail() {
    var email = new Object();
    email.email = document.getElementById("email").value;
    //Create a GET Request to the URL /recovery
    var request = new XMLHttpRequest();
    request.open("PUT", "/recovery", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into user_array and call the function 
    request.onload = function () {
        alert(request.responseText);
        localStorage.setItem("email", email.email)
        if (window.location.pathname == "/forgetpassword.html") {
            window.location.href = "/verifypassword.html";
        }
        else if (window.location.pathname == "/activate.html") {
            window.location.href = "/verify.html";
        }
    };
    request.send(JSON.stringify(email));
}
function checkEmail() {
    var email = new Object();
    email.email = document.getElementById("email").value;
    console.log(email.email);
    //Create a GET Request to the URL /email/activate
    var request = new XMLHttpRequest();
    request.open("GET", "/email/" + email.email, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        var response = request.responseText
        if (response == "true") {
            sendRecoveryEmail();
        }
        else {
            alert("Email not in use!")
        }
    };
    request.send(JSON.stringify(email));
}
function activateAccount() {
    var activate = new Object();
    activate.email = localStorage.getItem("email");
    activate.recovery_code = document.getElementById("recovery").value;
    //Create a GET Request to the URL /email/activate
    var request = new XMLHttpRequest();
    request.open("PUT", "/email/activate", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        var response = request.responseText
        alert(response);
        if (response.startsWith('"Activated')) {
            localStorage.removeItem("email");
            window.location.href = "/login.html";
        }
    };
    request.send(JSON.stringify(activate));
}
function changePassword() {
    var password = new Object();
    password.email = localStorage.getItem("email");
    password.password = document.getElementById("password").value;
    password.recovery_code = document.getElementById("recovery").value;
    //Create a GET Request to the URL /email/activate
    var request = new XMLHttpRequest();
    request.open("PUT", "/user/password", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into user_array and call the function 
    request.onload = function () {
        var response = request.responseText
        alert(response);
        if (response.startsWith('"Password changed')) {
            localStorage.removeItem("email");
            window.location.href = "/login.html";
        }
    };
    request.send(JSON.stringify(password));
}