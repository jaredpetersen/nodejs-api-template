'use strict';

const winston = require('winston');
const level = process.env.LOG_LEVEL || 'debug';
const silent = process.env.NODE_ENV == 'test';

const loggerFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `{"level": "${level}", "timestamp": "${timestamp}", "message": "${message}"}`;
});

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    loggerFormat
  ),
  transports: [
    new winston.transports.Console()
  ],
  exitOnError: false,
  silent
});

// Allow morgan middleware to write to winston
const stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = logger;
module.exports.stream = stream;