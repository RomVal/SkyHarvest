import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// URL to the service
const URL = 'http://api.weatherapi.com/v1/current.json';

export const getCurrentWeatherData = async (cityName) => {
  const params = { key: process.env.WEATHER_API_KEY, q: cityName };
  console.log('KEY', process.env.WEATHER_API_KEY);
  try {
    const response = await axios.get(URL, { params });

    if (response.status === 200) {
      return response?.data;
    } else {
      console.log(`Error in getCurrentWeatherData`, JSON.stringify(response));
    }
  } catch (error) {
    console.log(
      `Request failed in getCurrentWeatherData`,
      JSON.stringify(error)
    );
  }
};

const data = await getCurrentWeatherData('london');
console.log(data);
