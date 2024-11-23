import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Base service URL
const BASE_URL = 'http://api.waqi.info/feed';

const paramsPolution = {
  token: process.env.WAQI_API_TOKEN,
};

export const getCurrentPolutionData = async (cityName) => {
  console.log('KEY: ', process.env.WAQI_API_TOKEN);
  const sanitizedCityName = cityName.replace(/^\/|\/$/g, '');
  const urlPolution = new URL(`${BASE_URL}/${sanitizedCityName}`).toString();
  //const urlPolution = `${BASE_URL}/${cityName}`;
  try {
    const response = await axios.get(urlPolution, { params: paramsPolution });

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
