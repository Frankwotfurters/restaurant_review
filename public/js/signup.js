//function to retrieve user input and call signup function
function signUp() {
    //retrieve all data from signup.html
    var user = new Object();
    user.username = document.getElementById("username").value;
    user.password = document.getElementById("password").value;
    user.first_name = document.getElementById("first_name").value;
    user.last_name = document.getElementById("last_name").value;
    if (document.getElementById("maleRadio").checked) {
        user.gender = 1;
    }
    else if (document.getElementById("femaleRadio").checked) {
        user.gender = 0;
    }
    user.email = document.getElementById("email").value;
    user.mobile_number = document.getElementById("mobile_number").value;
    user.postal_code = document.getElementById("postal_code").value;
    //Server side verification
    if (user.username.length > 16) {
        alert("Username must be 16 characters or lower!");
    }
    else if (user.mobile_number.length != 8) {
        alert("Mobile number should be 8 characters!");
    }
    else if (user.postal_code.length != 6) {
        alert("Postal code should be 6 characters!")
    }
    else if (!captcha) {
        alert("Captcha not filled!")
    }
    else {
        //perform POST request to URL “/review with the created object review
        var signUp = new XMLHttpRequest();
        signUp.open("POST", "/user", true);
        signUp.setRequestHeader("Content-Type", "application/json");
        signUp.onload = function () {
            //display successful inserted message
            msg = signUp.responseText;
            alert(msg);
            if (msg.startsWith('"Success!"')) {
                document.location.href = "login.html";
            }
        }
        signUp.send(JSON.stringify(user));
    }
}
var captcha = false;
var onloadCallback = function () {
    grecaptcha.render('html_element', {
        'sitekey': '6LfmoMIUAAAAAK3EBaV5eg4RA1KfAhHGfK2NLG_L',
        'callback': correctCaptcha
    });
};
var correctCaptcha = function (response) {
    validate();
};
function validate() {
    captcha = true;
}