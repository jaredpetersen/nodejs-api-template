'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require('./task.js');
var idValidator = require('mongoose-id-validator');

var userSchema = new Schema({
    email: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

// Provides our cascading delete functionality
userSchema.pre('remove', function(next) {
    Task.remove({owner: this._id}).exec();
    next();
});

// Verify that object ID references match up
userSchema.plugin(idValidator);

var User = mongoose.model('User', userSchema);
module.exports = User;
