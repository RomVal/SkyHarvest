import got from 'got';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://api.waqi.info/feed/`;

// Query parameters
const paramsPolution = {
  token: process.env.WAQI_API_TOKEN,
};

export const getCurrentPolutionData = async (cityName) => {
  console.log('API Key:', process.env.WAQI_API_TOKEN);

  // Sanitize the city name and construct the URL
  const sanitizedCityName = cityName.trim(); // Remove leading/trailing spaces
  const urlPolution = new URL(sanitizedCityName, BASE_URL).toString();

  try {
    // Perform the GET request using `got`
    const response = await got(urlPolution, {
      searchParams: paramsPolution, // Equivalent to query params
      responseType: 'json', // Automatically parse JSON response
    });

    // Response handling
    console.log('Response Data:', response.body);
    return response.body;
  } catch (error) {
    // Improved error handling
    console.error('Request failed in getCurrentPolutionData:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.body,
    });
  }
};

const data = await getCurrentPolutionData('london');
console.log(data);
