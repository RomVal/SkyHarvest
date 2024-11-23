import axios from 'axios';
import dotenv from 'dotenv';

import { logger } from './../logger.js';

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
      logger.error(`Error in getCurrentWeatherData`, {
        message: response?.message,
        status: response?.status,
      });
    }
  } catch (error) {
    logger.error(`Request failed in getCurrentWeatherData`, {
      message: error?.message,
    });
  }
};

const parseWeatherResponse = (response) => {
  const current = response.current;

  let res = {};

  current
    ? (res = {
        temp_c: current?.temp_c || null,
        wind_kph: current?.wind_kph || null,
        gust_kph: current?.gust_kph || null,
        pressure_mb: current?.pressure_mb || null,
        precip_mm: current?.precip_mm || null,
        humidity: current?.humidity || null,
        cloud: current?.cloud || null,
        dewpoint_c: current?.dewpoint_c || null,
      })
    : {};

  return res;
};
