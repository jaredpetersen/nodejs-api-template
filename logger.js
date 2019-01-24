'use strict';

const winston = require('winston');
const level = process.env.LOG_LEVEL || 'debug';

const logger = winston.createLogger({
  level,
  transports: [
    new winston.transports.Console()
  ],
  exitOnError: false
});

// Allow morgan middleware to write to winston
const stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = logger;
module.exports.stream = stream;