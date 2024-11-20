import axios from 'axios';
import dotenv from 'dotenv';
import { Client } from '@googlemaps/google-maps-services-js';

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
    console.error('Error fetching directions:', error);
  }

  return res;
};

const parseGoogleMapsResponse = (response) => {
  const legs = response?.routes?.[0]?.legs?.[0];

  let res = {};

  legs
    ? (res = {
        distance: legs?.distance?.value,
        duration: legs?.duration?.value,
        duration_in_traffic: legs?.duration_in_traffic?.value,
      })
    : {};

  return res;
};
