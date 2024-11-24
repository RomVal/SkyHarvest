import axios from 'axios';
import dotenv from 'dotenv';

import { logger } from './../logger.js';

dotenv.config();

// URL to the service
const URL = 'http://api.weatherapi.com/v1/current.json';

/**
 * Fetches the current weather data for a given city.
 *
 * @param {string} cityName - The name of the city to fetch weather data for.
 * @returns {Promise<Object>} The parsed weather data.
 * @throws Will log an error if the request fails or if the response status is not 200.
 */
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

/**
 * Parses the weather response and extracts current weather data.
 *
 * @param {Object} response - The weather response object.
 * @param {Object} response.current - The current weather data.
 * @param {number} [response.current.temp_c] - The current temperature in Celsius.
 * @param {number} [response.current.wind_kph] - The current wind speed in kilometers per hour.
 * @param {number} [response.current.gust_kph] - The current wind gust speed in kilometers per hour.
 * @param {number} [response.current.pressure_mb] - The current atmospheric pressure in millibars.
 * @param {number} [response.current.precip_mm] - The current precipitation in millimeters.
 * @param {number} [response.current.humidity] - The current humidity percentage.
 * @param {number} [response.current.cloud] - The current cloud cover percentage.
 * @param {number} [response.current.dewpoint_c] - The current dew point in Celsius.
 * @returns {Object} An object containing the parsed current weather data.
 */
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
