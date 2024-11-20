import { db } from './db/db-init.js';

class Logger {
  constructor(collectionName = 'logs', addToDBEnabled = true) {
    this.collectionName = collectionName;
    this.addToDBEnabled = addToDBEnabled;
  }

  // Method for writing logs
  async log(level, message, metadata = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      message,
      ...(Object.keys(metadata).length > 0 ? metadata : {}),
    };

    // Console
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

      console.log(
        `Log for ${this.collectionName} ${timestamp} sucessfully added.`
      );
    } catch (error) {
      console.error('Error when adding logger data', error);
    }
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

// Create a logger instance
export const logger = new Logger();
