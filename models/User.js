"use strict"

class User {
    constructor(username, password, first_name, last_name, gender, mobile_number, postal_code, email, activated, picture_url, recovery_code) {
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.mobile_number = mobile_number;
        this.postal_code = postal_code;
        this.email = email;
        this.activated = activated;
        this.picture_url = picture_url;
        this.recovery_code = recovery_code;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getGender() {
        return this.gender;
    }
    getMobileNumber() {
        return this.mobile_number;
    }
    getPostalCode() {
        return this.postal_code;
    }
    getEmail() {
        return this.email;
    }
    getActivated() {
        return this.activated;
    }
    getPictureUrl() {
        return this.picture_url;
    }
    getRecoveryCode() {
        return this.recovery_code;
    }
}

module.exports = User;