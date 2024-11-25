import fs from 'fs';

import { db } from '../db/db-init.js';
import { CITY } from './../default-cities-config.js';

/**
 * * @constant {CITY}
 * The name of the city for which statistics are being generated.
 */
const CITY_NAME = CITY.berlin;
// Start and end time (UTC) for which to generate statistics
const START_DATE = new Date('2024-11-20T00:00:00.000Z');
const END_DATE = new Date('2024-11-23T23:59:59.999Z');

/**
 * Retrieves data for a given city from a Firestore collection,
 * generates a CSV file with the data, and saves it to the local filesystem.
 *
 * @param {string} cityName - The name of the city for which to retrieve data.
 * @returns {Promise<void>} - A promise that resolves when the CSV file has been written.
 * @throws {Error} - If there is an error retrieving data from Firestore or writing the CSV file.
 */
async function getCityCSV(cityName) {
  try {
    const snapshot = await db.collection(cityName).get();
    const rows = [];

    // Add csv headers
    rows.push(
      `ID,temp_c,wind_kph,gust_kph,pressure_mb,precip_mm,humidity,cloud,dewpoint_c,traffic_level,traffic_speed,aqi,pm10,pm25,so2,no2,co`
    );

    snapshot.forEach((doc) => {
      const data = doc.data();
      const dateToCheck = new Date(doc?.id);
      if (dateToCheck >= START_DATE && dateToCheck <= END_DATE) {
        const weather = data?.weather;
        const polution = data?.polution;
        const precip_mm = weather?.precip_mm || 0;
        rows.push(
          `${doc.id},${weather?.temp_c},${weather?.wind_kph},${weather?.gust_kph},${weather?.pressure_mb},${precip_mm},${weather?.humidity},${weather?.cloud},${weather?.dewpoint_c},${getTrafficLevel(data?.traffic)},${getTrafficSpeed(data?.traffic)},${polution?.aqi},${polution?.pm10},${polution?.pm25},${polution?.so2},${polution?.no2},${polution?.co}`
        );
      }
    });

    if (rows.length > 1) {
      const fileContent = rows.join('\n');

      // Write to the csv file
      fs.writeFileSync(`./csv/users_${cityName}.csv`, fileContent, 'utf8');
      // eslint-disable-next-line no-console
      console.log(`Data successully stored in users_${cityName}.csv`);
    } else {
      // eslint-disable-next-line no-console
      console.log('No data to store');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error when retrieving data for ${cityName}`, error);
  }
}

/**
 * Calculates the traffic level based on the provided traffic data.
 *
 * @param {Array<Object>} traffic - An array of traffic data objects.
 * @param {number} traffic[].duration - The duration of the trip.
 * @param {number} traffic[].duration_in_traffic - The duration of the trip spent in traffic.
 * @returns {number|null} The traffic level as a ratio of duration in traffic to total duration, or null if an error occurs.
 */
function getTrafficLevel(traffic) {
  let durationSum = 0;
  let durationInTrafficSum = 0;

  try {
    for (const line of traffic) {
      durationSum += line?.duration;
      durationInTrafficSum += line?.duration_in_traffic;
    }

    return durationInTrafficSum / durationSum;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error when calculating traffic level', error);
    return null;
  }
}

/**
 * Calculates the average traffic speed from an array of traffic data.
 *
 * @param {Array} traffic - An array of traffic data objects.
 * @param {number} traffic[].distance - The distance covered in the traffic segment.
 * @param {number} traffic[].duration_in_traffic - The duration spent in traffic for the segment.
 * @returns {number|null} The average traffic speed, or null if an error occurs.
 */
function getTrafficSpeed(traffic) {
  let durationInTrafficSum = 0;
  let distanceSum = 0;
  try {
    for (const line of traffic) {
      distanceSum += line?.distance;
      durationInTrafficSum += line?.duration_in_traffic;
    }

    return distanceSum / durationInTrafficSum;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error when calculating traffic speed', error);
    return null;
  }
}

getCityCSV(CITY_NAME);
