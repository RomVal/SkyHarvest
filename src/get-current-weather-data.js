import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// URL to the service
const URL = 'http://api.weatherapi.com/v1/current.json';

export const getCurrentWeatherData = async (cityName) => {
  const params = { key: process.env.WEATHER_API_KEY, q: cityName };
  try {
    const response = await axios.get(URL, { params });

    if (response.status === 200) {
      return parseWeatherResponse(response.data);
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
  }
};

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
