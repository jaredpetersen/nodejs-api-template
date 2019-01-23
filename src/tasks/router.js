'use strict';

// Router
const router = require('express').Router();
const tasks = require('./index');

// Tasks
router.get('/', tasks.findAll);
router.post('/', tasks.buggyRoute);

// Export the router
module.exports = router;