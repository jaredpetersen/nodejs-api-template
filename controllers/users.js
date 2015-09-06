'use strict';

var User = require('../models/user.js');
var errors = require('./errors.js');
var bcrypt = require('bcryptjs');

// Get all users
exports.findAll = function(req, res, next) {
    User.find(null, '-__v -password', function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
};

// Get a specific user
exports.findById = function(req, res, next) {
    User.findById(req.params.id, '-__v', function(err, user) {
        if (err) return next(err);
        // Return 404 for a nonexistant user
        if (user == null) return next(errors.newError(404));
        res.json(user);
    });
};

// Register a user
exports.add = function(req, res, next) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var newUser = new User();
    newUser.email = req.body.email;
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.password = hash;
    newUser.save(function(err, newUser) {
        if (err) return next(err);
        res.status(201).json({"message": "User Registered!"});
    });
};

// Update a specific user (no password)
exports.update = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        // Return 404 for a nonexistant user
        if (user == null) return next(errors.newError(404));
        user.email = req.body.email;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.save(function(err, user) {
            if (err) return next(err);
            res.json({"message": "User Updated!"});
        });
    });
};

// Delete a specific user
exports.delete = function(req, res, next) {
    // Can't use findByIdAndRemove() or Model.remove() in order to invoke
    // the middleware; Have to remove a specific document
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        // Return 404 for a nonexistant user
        if (user == null) return next(errors.newError(404));
        user.remove(function(err, user) {
            if (err) return next(err);
            res.json({"message": "User Deleted!"});
        });
    });
}
