import axios from 'axios';
import dotenv from 'dotenv';
import { Client } from '@googlemaps/google-maps-services-js';

// Load environment variables
dotenv.config();

const PARSE_INTERVAL = 2000;

// URL to the service
const url = 'http://api.weatherapi.com/v1/current.json';
const urlPolution = 'http://api.waqi.info/feed/kyiv';

const origin2 = { lat: 50.429686, lng: 30.541771 }; // Coordinates for Kyiv
const destination2 = { lat: 50.424613, lng: 30.61942 }; // Coordinates for Lviv

// Initialize the Google Maps client
const client = new Client();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Parameters for the request
const params = {
  key: process.env.WEATHER_API_KEY,
  q: 'Kyiv',
};

const paramsPolution = {
  token: process.env.WAQI_API_TOKEN,
};

// Function to make the request
const makeWeatherRequest = async () => {
  try {
    const response = await axios.get(url, { params });

    // If the request was successful (status code 200)
    if (response.status === 200) {
      console.log(
        `PARSED_DATA: ${JSON.stringify(parseWeatherResponse(response.data))}`
      );
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
  }
};

const makePolutionRequest = async () => {
  try {
    const response = await axios.get(urlPolution, { params: paramsPolution });

    // If the request was successful (status code 200)
    if (response.status === 200) {
      console.log(
        `POLUTION_DATA: ${JSON.stringify(parsePolutionResponse(response.data))}`
      );
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
  }
};

const makeGoogleMapsRequest = async () => {
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
    //console.log(JSON.stringify(response.data)); // Log the directions result

    console.log(
      `GOOGLE_MAPS_DATA: ${JSON.stringify(parseGoogleMapsResponse(response.data))}`
    );
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
};

// Function to parse the weather response
const parseWeatherResponse = (response) => {
  const current = response.current;

  let res = {};

  current
    ? (res = {
        temp_c: current?.temp_c,
        wind_kph: current?.wind_kph,
        gust_kph: current?.gust_kph,
        pressure_mb: current?.pressure_mb,
        precip_mm: current?.precip_mm,
        humidity: current?.humidity,
        cloud: current?.cloud,
        dewpoint_c: current?.dewpoint_c,
      })
    : {};

  return res;
};

const parsePolutionResponse = (response) => {
  const data = response?.data;
  const iaqi = data?.iaqi;

  let res = {};

  res = {
    aqi: data?.aqi,
    pm10: iaqi?.pm10?.v,
    pm25: iaqi?.pm25?.v,
    so2: iaqi?.so2?.v,
    no2: iaqi?.no2?.v,
    co: iaqi?.co?.v,
  };

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

const startRequestLoop = () => {
  const makeRequests = () => {
    makeWeatherRequest();
    makePolutionRequest();
    makeGoogleMapsRequest();
  };

  setInterval(makeRequests, PARSE_INTERVAL);
};

// Start the loop
startRequestLoop();
