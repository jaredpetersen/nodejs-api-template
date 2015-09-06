'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var idValidator = require('mongoose-id-validator');

var taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    created: {type: Date, default: Date.now},
    owner: {type : Schema.Types.ObjectId, ref: 'User'},
});

// Verify that object ID references match up
taskSchema.plugin(idValidator);

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
