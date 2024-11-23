import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://api.waqi.info/feed/london`;

const paramsPolution = {
  token: process.env.WAQI_API_TOKEN,
};

export const getCurrentPolutionData = async (cityName) => {
  const urlPolution = '';
  try {
    const response = await axios.get(urlPolution);

    if (response?.status === 200) {
      return response?.data;
    } else {
      console.log(`Error in getCurrentPolutionData`, JSON.stringify(response));
    }
  } catch (error) {
    console.log(
      `Request failed in getCurrentPolutionData`,
      JSON.stringify(error)
    );
  }
};

const data = await getCurrentPolutionData('london');
console.log(data);
