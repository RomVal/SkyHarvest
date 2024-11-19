import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// URL to the service
const url = 'http://api.weatherapi.com/v1/current.json';

// Parameters for the request
const params = {
  key: process.env.WEATHER_API_KEY,
  q: 'Kyiv',
};

// Function to make the request
export const makeWeatherRequest = async () => {
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
