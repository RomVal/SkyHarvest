import { Client } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';

import { logger } from './../logger.js';

dotenv.config();

// Initialize the Google Maps client
const client = new Client();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getGoogleMapsData = async (trafficData) => {
  let res = [];
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
