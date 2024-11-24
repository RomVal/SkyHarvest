import { logger } from './../logger.js';
import { db } from './db-init.js';

/**
 * Adds a record to the specified city's collection in the Firebase database.
 *
 * @param {string} cityName - The name of the city to which the record will be added.
 * @param {string} timestamp - The timestamp to be used as the document ID.
 * @param {Object} cityData - The data to be added to the city's collection.
 * @returns {Promise<void>} - A promise that resolves when the data is successfully added.
 * @throws {Error} - Throws an error if there is an issue adding the data to the database.
 */
export async function addRecordtoCity(cityName, timestamp, cityData) {
  try {
    const userRef = db.collection(cityName).doc(timestamp);

    await userRef.set(cityData);

    logger.debug(`Data for ${cityName} ${timestamp} sucessfully added to DB.`);
  } catch (error) {
    logger.error(`Error when adding city data`, {
      message: error?.message,
    });
  }
}
