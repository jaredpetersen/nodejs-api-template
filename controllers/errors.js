'use strict';

/*
   Handle all of the errors
   List of the error codes being checked
   ValidationError -- User gave us bad parameters
   CastError -- User did not give us a real ID
*/
exports.errorHandler = function(err, req, res, next) {
    // Check for the various error statuses
    if (err.status == 400 ||
        err.name == 'ValidationError') {
        res.status(400).json({"message": "Bad Request"});
    }
    else if (err.status == 404 ||
             err.name == 'CastError') {
        res.status(404).json({"message": "Not Found"});
    }
    else if (err.status == 401) {
        res.status(401).json({"message": "Unauthorized"});
    }
    else {
        res.status(500).json({"message": "Internal Server Error"});
    }
};

exports.nullRoute = function(req, res, next) {
    // Requested route just doesn't exist
    res.status(404).json({"message": "Not Found"});
};

// We have to do some extra error handling because Mongoose sometimes sends
// us back dumb information. Part of this is related to the following bug:
// https://github.com/Automattic/mongoose/issues/3270
exports.newError = function(statusCode) {
    var err = new Error();
    err.status = statusCode;
    return err;
}
