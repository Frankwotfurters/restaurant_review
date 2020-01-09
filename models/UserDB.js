"use strict"

var db = require("../db-connection");
const User = require("./User")

class UserDB{
    getUser(request, respond) {
        var username = request.params.username;
        var sql = "SELECT *, activated=1 AS activated, gender=1 AS gender FROM account_details WHERE username = ?";
        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    addUser(request, respond) {
        var userObject = new User(request.body.username, request.body.password, request.body.first_name, request.body.last_name, request.body.gender, request.body.mobile_number, request.body.postal_code, request.body.email, request.body.activated, null, null);
        var msg;

        var check = "SELECT username FROM account_details WHERE username = ? OR mobile_number = ? OR email = ?";
        var checkvalues = [userObject.getUsername(), userObject.getMobileNumber(), userObject.getEmail()];

        var sql = "INSERT INTO account_details (username, first_name, last_name, gender, mobile_number, postal_code, email, activated) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, 0)";
        var values = [userObject.getUsername(), userObject.getFirstName(), userObject.getLastName(), userObject.getGender(),
                    userObject.getMobileNumber(), userObject.getPostalCode(), userObject.getEmail()];
                
        var password = "INSERT INTO passwords (username, password) VALUES (?, ?)";
        var passvalues = [userObject.getUsername(), userObject.getPassword()];

        db.query(check, checkvalues, function (error, result) {
        //Checks if username, mobile number or email is in use
            if (error) {
                throw error;
            }
            else {
                if (result.length == 0) {
                //If no duplicate entries
                    db.query(sql, values, function (error, result) {
                    //Insert account details into database
                        if (error) {
                            throw error;
                        }
                        else {
                            db.query(password, passvalues, function (error, result) {
                            //Insert password into database
                                if (error) {
                                    throw error;
                                }
                                else {
                                    msg = "Success!";
                                    respond.json(msg);
                                }
                            });
                        }
                    });
                }
                else {
                //If username, mobile number or email is already taken
                    msg = "Duplicate entry";
                    respond.json(msg)
                }
            }
        });
    }
    deleteUser(request, respond) {
        var username = request.params.username;
        var sql = "DELETE FROM account_details WHERE username = ?";
        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    updateInfo(request, respond) {
        var userObject = new User(request.params.username, null, request.body.first_name, request.body.last_name, request.body.gender, request.body.mobile_number, request.body.postal_code, request.body.email, null, null, null);
        var msg;

        var check = "SELECT username " +
                    "FROM account_details " +
                    "WHERE NOT username = ? AND (mobile_number = ? OR email = ?)";

        var checkvalues = [userObject.getUsername(), userObject.getMobileNumber(), userObject.getEmail()];

        var sql =   "UPDATE account_details " +
                    "SET first_name = ?, " +
                    "last_name = ?, " +
                    "gender = ?, " +
                    "mobile_number = ?, " +
                    "postal_code = ?, " +
                    "email = ? " +
                    "WHERE username = ?";

        var values = [userObject.getFirstName(), userObject.getLastName(), userObject.getGender(), userObject.getMobileNumber(), 
                    userObject.getPostalCode(), userObject.getEmail(), userObject.getUsername()];
                    
        db.query(check, checkvalues, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length > 0) {
                    console.log(result);
                //If number or email in use
                    msg = "Mobile number or email in use!";
                    respond.json(msg);
                }
                else {
                //If number and email available
                    db.query(sql, values, function (error, result) {
                        if (error) {
                            throw error;
                        }
                        else {
                            msg = "Updated user info successfully!"
                            respond.json(msg);
                        }
                    });
                }
            }
        });
    }
    updatePicture(request, respond) {
        var username = request.params.username;
        var picture_url = request.body.picture_url;
        var sql =   "UPDATE account_details " +
                    "SET picture_url = ? " +
                    "WHERE username = ?";

        var values = [picture_url, username];
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    setActivate(request, respond) {
        var userObject = new User(request.body.username, null, null, null, null, null, null, null, request.body.activated, null, null)
        var sql = "UPDATE account_details SET activated = ? WHERE username = ?";
        var values = [userObject.getActivated(), userObject.getUsername()];
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
    changePassword(request, respond) {
        var email = request.body.email;
        var password = request.body.password;
        var recovery_code = request.body.recovery_code;
        var msg;

        var check = "SELECT username FROM account_details WHERE email = ?"

        var verification = "SELECT username, recovery_code FROM account_details WHERE email = ?";

        db.query(check, email, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length == 0) {
                //If email not in use
                    msg = "Email entered is not in use!"
                    respond.json(msg);
                }
                else {
                //If email is used
                db.query(verification, email, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    else {
                        if (result[0].recovery_code == recovery_code) {
                        //If recovery_code is correct
                            var sql = "UPDATE passwords SET password = ? WHERE username = ?";
                            var values = [password, result[0].username];
                            db.query(sql, values, function (error, result) {
                                if (error) {
                                    throw error;
                                }
                                else {
                                    msg = "Password changed successfully!";
                                    respond.json(msg);
                                }
                            });
                        }
                        else {
                            msg = "Incorrect recovery code entered!";
                            respond.json(msg);
                        }
                    }
                });
                }
            }
        });
    }
    getLoginCredentials(request, respond) {
        var username = request.body.username;
        var password = request.body.password;
        var msg = "";
        var sql =   "SELECT passwords.password, account_details.username, account_details.activated=1 AS activated " +
                    "FROM account_details " +
                    "INNER JOIN passwords ON account_details.username = passwords.username " +
                    "WHERE account_details.username = ?";
        
        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if(result.length > 0) {
                //If username exists
                    if(password == result[0].password) {
                    //If password is correct
                        if(result[0].activated == 1) {
                        //If user is activated
                            msg = "SUCCESS! Welcome " + result[0].username + "!";
                            console.log(msg);
                        }
                        else {
                        //If user is NOT activated
                            msg = "SUCCESS! Please activate your account"
                            console.log(msg) 
                        }
                    }
                    else {
                    //Wrong password
                        msg = "FAIL! Password incorrect!";
                        console.log(msg);
                    }
                }
                else {
                //Username does not exist
                    msg = "USER NOT FOUND!";
                    console.log(msg);
                }
                respond.json(msg);
            }
        });
    }
    addRecoveryCode(request, respond) {
        var username = request.params.username;
        var recovery_code = request.body.recovery_code;
        var sql = "UPDATE account_details SET recovery_code = ? WHERE username = ?";
        var values = [recovery_code, username]
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}

module.exports = UserDB;