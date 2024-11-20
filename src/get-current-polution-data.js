import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Base service URL
const BASE_URL = 'http://api.waqi.info/feed';

const paramsPolution = {
  token: process.env.WAQI_API_TOKEN,
};

export const getCurrentPolutionData = async (cityName) => {
  const urlPolution = `${BASE_URL}/${cityName}`;
  try {
    const response = await axios.get(urlPolution, { params: paramsPolution });

    if (response.status === 200) {
      return parsePolutionResponse(response.data);
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
  }
};

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
