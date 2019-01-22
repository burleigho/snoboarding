const winston = require('winston');
const appRoot = require('app-root-path');
require('winston-mongodb');

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  db: {
    db: "mongodb://localhost:27017/onboarding",
    level: 'debug',
    collection: 'logs'
  }
};

const logger =  winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.MongoDB(options.db),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;