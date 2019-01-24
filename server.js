'use strict';

// API boilerplate
const express = require('express');
const app = express();
const routes = require('./routes');

// Logging
const morgan = require('morgan');
const logger = require('./logger');

// Config
const config = require('config');

// Set up middleware for request parsing, logging, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short', { stream: logger.stream }));

// Load up the routes
app.use('/', routes);

// Start the API
app.listen(config.apiPort);
logger.log('info', `api running on port ${config.apiPort}`);

// Export API server for testing
module.exports = app;
