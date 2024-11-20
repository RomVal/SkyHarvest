import { db } from './db-init.js';
import { logger } from './../logger.js';

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
