import axios from 'axios';
import dotenv from 'dotenv';

import { logger } from './../logger.js';

dotenv.config();

// Base service URL
const BASE_URL = 'http://api.waqi.info/feed';

const paramsPolution = {
  token: process.env.WAQI_API_TOKEN,
};

/**
 * Fetches the current pollution data for a given city.
 *
 * @param {string} cityName - The name of the city to get pollution data for.
 * @returns {Promise<Object>} The parsed pollution data.
 * @throws Will log an error if the request fails or if the response status is not 200.
 */
export const getCurrentPolutionData = async (cityName) => {
  const urlPolution = `${BASE_URL}/${cityName}`;
  try {
    const response = await axios.get(urlPolution, { params: paramsPolution });

    if (response.status === 200) {
      return parsePolutionResponse(response.data);
    } else {
      logger.error(`Error in getCurrentPolutionData`, {
        message: response?.message,
        status: response?.status,
      });
    }
  } catch (error) {
    logger.error(`Request failed in getCurrentPolutionData`, {
      message: error?.message,
    });
  }
};

/**
 * Parses the pollution response and extracts relevant air quality data.
 *
 * @param {Object} response - The response object containing pollution data.
 * @param {Object} response.data - The data object within the response.
 * @param {number} response.data.iaqi.pm10.v - The PM10 value.
 * @param {number} response.data.iaqi.pm25.v - The PM25 value.
 * @param {number} response.data.iaqi.so2.v - The SO2 value.
 * @param {number} response.data.iaqi.no2.v - The NO2 value.
 * @param {number} response.data.iaqi.co.v - The CO value.
 * @returns {Object} An object containing parsed air quality data.
 * @returns {number|null} return.aqi - The overall air quality index.
 * @returns {number|null} return.pm10 - The PM10 value.
 * @returns {number|null} return.pm25 - The PM25 value.
 * @returns {number|null} return.so2 - The SO2 value.
 * @returns {number|null} return.no2 - The NO2 value.
 * @returns {number|null} return.co - The CO value.
 */
const parsePolutionResponse = (response) => {
  const data = response?.data;
  const iaqi = data?.iaqi;

  let res = {};

  res = {
    aqi: data?.aqi || null,
    pm10: iaqi?.pm10?.v || null,
    pm25: iaqi?.pm25?.v || null,
    so2: iaqi?.so2?.v || null,
    no2: iaqi?.no2?.v || null,
    co: iaqi?.co?.v || null,
  };

  return res;
};
