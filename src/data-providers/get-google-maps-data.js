import { Client } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';

import { logger } from './../logger.js';

dotenv.config();

// Initialize the Google Maps client
const client = new Client();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * Fetches Google Maps directions data for a list of traffic data.
 *
 * @param {Array} trafficData - An array of traffic data objects, each containing origin and destination properties.
 * @returns {Promise<Array>} A promise that resolves to an array of parsed Google Maps response data.
 */
export const getGoogleMapsData = async (trafficData) => {
  const res = [];
  try {
    for (const traffic of trafficData) {
      const origin = traffic?.origin;
      const destination = traffic?.destination;

      const response = await client.directions({
        params: {
          origin,
          destination,
          mode: 'driving',
          departure_time: 'now', // Use "now" for immediate departure
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      res.push(parseGoogleMapsResponse(response.data));
    }
  } catch (error) {
    logger.error('Error fetching directions in getGoogleMapsData', {
      message: error?.message,
    });
  }

  return res;
};

/**
 * Parses the response from Google Maps API to extract relevant data.
 *
 * @param {Object} response - The response object from Google Maps API.
 * @param {number} [response.routes[0].legs[0].distance.value] - Distance value in meters.
 * @param {number} [response.routes[0].legs[0].duration.value] - Duration value in seconds.
 * @param {number} [response.routes[0].legs[0].duration_in_traffic.value] - Duration in traffic value in seconds.
 * @returns {Object} An object containing distance, duration, and duration_in_traffic values.
 */
const parseGoogleMapsResponse = (response) => {
  const legs = response?.routes?.[0]?.legs?.[0];

  let res = {};

  legs
    ? (res = {
        distance: legs?.distance?.value || null,
        duration: legs?.duration?.value || null,
        duration_in_traffic: legs?.duration_in_traffic?.value || null,
      })
    : {};

  return res;
};
