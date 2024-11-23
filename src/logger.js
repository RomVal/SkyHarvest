import { db } from './db/db-init.js';

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

class Logger {
  constructor(
    collectionName = 'logs',
    logLevel = 'info',
    addToDBEnabled = true
  ) {
    this.collectionName = collectionName;
    this.addToDBEnabled = addToDBEnabled;
    this.logLevel = logLevel;
  }

  shouldLog(level) {
    return LOG_LEVELS[level] <= LOG_LEVELS[this.logLevel];
  }

  // Method for writing logs
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

  debug(message, metadata = {}) {
    return this.log('debug', message, metadata);
  }

  info(message, metadata = {}) {
    return this.log('info', message, metadata);
  }

  warn(message, metadata = {}) {
    return this.log('warn', message, metadata);
  }

  error(message, metadata = {}) {
    return this.log('error', message, metadata);
  }
}

export const logger = new Logger();
