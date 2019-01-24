'use strict';

const errors = require('../errors');

exports.findAll = (req, res, next) => {
  // Simulate task list, normally this would be retrieved from a database
  const tasks = [
    {'_id': 1, 'name': 'milk'},
    {'_id': 2, 'name': 'cheese'},
    {'_id': 3, 'name': 'milk'}
  ];

  res.status(200).json(tasks);
};

exports.buggyRoute = (req, res, next) => {
  // Simulate a custom error
  next(errors.newHttpError(400, 'bad request'));
};
