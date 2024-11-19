import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// URL to the service
const urlPolution = 'http://api.waqi.info/feed/kyiv';

const paramsPolution = {
  token: process.env.WAQI_API_TOKEN,
};

export const makePolutionRequest = async () => {
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
