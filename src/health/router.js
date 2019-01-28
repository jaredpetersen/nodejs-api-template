'use strict';

// Router
const router = require('express').Router();
const health = require('./index');

// Health
router.get('/', health.status);

// Export the router
module.exports = router;