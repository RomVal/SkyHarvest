import { db } from './db/db-init.js';

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

/**
 * Logger class for logging messages with different log levels and optionally storing them in a database.
 */
class Logger {
  /**
   * Creates an instance of the Logger class.
   *
   * @param {string} [collectionName='logs'] - The name of the collection where logs will be stored.
   * @param {string} [logLevel='info'] - The level of logging (e.g., 'info', 'warn', 'error').
   * @param {boolean} [addToDBEnabled=true] - Flag indicating whether to add logs to the database.
   */
  constructor(
    collectionName = 'logs',
    logLevel = 'info',
    addToDBEnabled = true
  ) {
    this.collectionName = collectionName;
    this.addToDBEnabled = addToDBEnabled;
    this.logLevel = logLevel;
  }

  /**
   * Determines if a message at the specified log level should be logged.
   *
   * @param {string} level - The log level to check.
   * @returns {boolean} - Returns true if the message should be logged, otherwise false.
   */
  shouldLog(level) {
    return LOG_LEVELS[level] <= LOG_LEVELS[this.logLevel];
  }

  /**
   * Logs a message with a specified level and optional metadata.
   *
   * @param {string} level - The log level (e.g., 'info', 'warn', 'error').
   * @param {string} message - The message to log.
   * @param {Object} [metadata={}] - Optional metadata to include with the log entry.
   * @returns {Promise<void>} - A promise that resolves when the log entry has been processed.
   */
  async log(level, message, metadata = {}) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logEntry = {
      message,
      ...(Object.keys(metadata).length > 0 ? metadata : {}),
    };

    // eslint-disable-next-line no-console
    console.log(
      `[${timestamp}] [${level.toUpperCase()}]: ${message}`,
      metadata
    );

    // Firebase
    if (this.addToDBEnabled) {
      await this.addLogDataToDB(level, timestamp, logEntry);
    }
  }

  /**
   * Adds log data to the database.
   *
   * @param {string} level - The log level (e.g., 'info', 'error').
   * @param {string} timestamp - The timestamp of the log entry.
   * @param {Object} logEntry - The log entry data to be added to the database.
   * @returns {Promise<void>} A promise that resolves when the log entry is successfully added to the database.
   */
  async addLogDataToDB(level, timestamp, logEntry) {
    try {
      const userRef = db
        .collection(this.collectionName)
        .doc(`${timestamp} ${level.toUpperCase()}`);

      await userRef.set(logEntry);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error when adding logger data to db', error);
    }
  }

  /**
   * Logs a debug message with optional metadata.
   *
   * @param {string} message - The debug message to log.
   * @param {Object} [metadata={}] - Additional metadata to include with the log message.
   * @returns {void}
   */
  debug(message, metadata = {}) {
    return this.log('debug', message, metadata);
  }

  /**
   * Logs an informational message with optional metadata.
   *
   * @param {string} message - The message to log.
   * @param {Object} [metadata={}] - Additional metadata to include with the log.
   * @returns {void}
   */
  info(message, metadata = {}) {
    return this.log('info', message, metadata);
  }

  /**
   * Logs a warning message with optional metadata.
   *
   * @param {string} message - The warning message to log.
   * @param {Object} [metadata={}] - Additional metadata to include with the log entry.
   * @returns {void}
   */
  warn(message, metadata = {}) {
    return this.log('warn', message, metadata);
  }

  /**
   * Logs an error message with optional metadata.
   *
   * @param {string} message - The error message to log.
   * @param {Object} [metadata={}] - Additional metadata to include with the log.
   * @returns {*} The result of the log operation.
   */
  error(message, metadata = {}) {
    return this.log('error', message, metadata);
  }
}

export const logger = new Logger();
