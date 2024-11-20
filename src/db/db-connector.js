import { db } from './db-init.js';

export async function addRecordtoCity(cityName, timestamp, cityData) {
  try {
    const userRef = db.collection(cityName).doc(timestamp);

    await userRef.set(cityData);

    console.log(`Record for ${cityName} ${timestamp} sucessfully added.`);
  } catch (error) {
    console.error('Error when adding city data', error);
  }
}

export async function addRecordtoCollection(
  collectionName,
  timestamp,
  cityData
) {
  try {
    const userRef = db.collection(collectionName).doc(timestamp);

    await userRef.set(cityData);

    console.log(`Record for ${collectionName} ${timestamp} sucessfully added.`);
  } catch (error) {
    console.error('Error when adding city data', error);
  }
}
