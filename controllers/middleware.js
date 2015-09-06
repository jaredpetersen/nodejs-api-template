'use strict';

exports.logEverything = function(req, res, next) {
    // Middleware goes here
    next();
};
