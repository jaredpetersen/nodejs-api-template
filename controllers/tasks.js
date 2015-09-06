'use strict';

var Task = require('../models/task.js');
var errors = require('./errors.js');

// Get all tasks
exports.findAll = function(req, res, next) {
    Task.find(null, '-__v', function(err, tasks) {
        if (err) return next(err);
        res.json(tasks);
    });
};

// Get a specific task
exports.findById = function(req, res, next) {
    Task.findById(req.params.id, '-__v', function(err, task) {
        if (err) return next(err);
        // Return 404 for a nonexistant task
        if (task == null) return next(errors.newError(404));
        res.json(task);
    });
};

// Add a new task
exports.add = function(req, res, next) {
    var newTask = new Task();
    newTask.name = req.body.name;
    newTask.description = req.body.description || null;
    newTask.owner = req.body.owner || null;
    newTask.save(function(err, newTask) {
        if (err) return next(err);
        res.status(201).json({"message": "Task Created!"});
    });
};

// Update a specific task
exports.update = function(req, res, next) {
    Task.findById(req.params.id, function(err, task) {
        if (err) return next(err);
        // Return 404 for a nonexistant task
        if (user == null) return next(errors.newError(404));
        task.name = req.body.name;
        task.description = req.body.description;
        task.owner = req.body.owner;
        task.save(function(err, task) {
            if (err) return next(err);
            res.json({"message": "Task Updated!"});
        });
    });
};

// Delete a specific task
exports.delete = function(req, res, next) {
    Task.findByIdAndRemove({_id: req.params.id}, function(err, task) {
        if (err) return next(err);
        // Return 404 for a nonexistant task
        if (task == null) return next(errors.newError(404));
        res.json({"message": "Task Deleted!"});
    });
};
