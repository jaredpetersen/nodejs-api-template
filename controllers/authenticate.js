'use strict';

var mongoose = require('mongoose');
var User = require('../models/user.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');

// Authenticate the user
exports.login = function(req, res, next) {
    // Make sure we're getting all of the necessary fields
    if (req.body.email == undefined || req.body.password == undefined) {
        var err = new Error();
        err.status = 400;
        return next(err);
    }
    User.findOne({email: req.body.email}, function(err, user) {
        // User exists, make sure the password is correct
        if (user != null &&
            bcrypt.compareSync(req.body.password, user.password)) {
            // Create the JSON token
            // Look into adding a JTI in the future for additional security
            var token = jwt.sign(
                {"email": req.body.email,
                 "id": user._id},
                 config.tokenSecret,
                 {
                    // Expire in 24 hours
                    expiresInMinutes: config.tokenExpiration
                 }
            );
            // Return the information including token as JSON
            res.json({
                "message": "User Authenticated!",
                "token": token
            });
        }
        // User does not exist, authentication failed
        else {
            // User does not exist
            var err = new Error();
            err.status = 401;
            return next(err);
        }
    });
};

// Check if the user is Authenticated
// Not actually part of a normal route
exports.verify = function(req, res, next) {
    // Grab the JSONWebToken
    var token = req.body.token ||
                req.query.token ||
                req.headers['x-access-token'];

    // Decode the token if it exists
    if (token) {
        // Verify the token
        jwt.verify(token, config.tokenSecret, function(err, decoded) {
            if (err) {
                // Something went wrong here (likely expired token) so just tell
                // the user that they need to re-authenticate
                var err = new Error();
                err.status = 401;
                next(err);
            }
            else {
                // Everything is good, send along the decoded token so that other
                // requests can pick up the data if necessary
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        var err = new Error();
        err.status = 401;
        next(err);
    }
};
