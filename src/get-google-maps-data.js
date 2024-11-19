import axios from 'axios';
import dotenv from 'dotenv';
import { Client } from '@googlemaps/google-maps-services-js';

dotenv.config();

const origin2 = { lat: 50.429686, lng: 30.541771 }; // Coordinates for Kyiv
const destination2 = { lat: 50.424613, lng: 30.61942 }; // Coordinates for Lviv

// Initialize the Google Maps client
const client = new Client();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const getGoogleMapsData = async () => {
  try {
    const response = await client.directions({
      params: {
        origin: origin2,
        destination: destination2,
        mode: 'driving',
        departure_time: 'now', // Use "now" for immediate departure
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    console.log(
      `GOOGLE_MAPS_DATA: ${JSON.stringify(parseGoogleMapsResponse(response.data))}`
    );
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
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
