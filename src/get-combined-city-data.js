import { getCurrentPolutionData } from './data-providers/get-current-polution-data.js';
import { getCurrentWeatherData } from './data-providers/get-current-weather-data.js';
import { getGoogleMapsData } from './data-providers/get-google-maps-data.js';

export const getCombinedCityData = async ({ cityName, trafficConfig }) => {
  const weatherData = await getCurrentWeatherData(cityName);
  const trafficData = await getGoogleMapsData(trafficConfig);
  const polutionData = await getCurrentPolutionData(cityName);

  return {
    cityName: cityName?.toLowerCase(),
    timestamp: new Date().toISOString(),
    data: {
      weather: weatherData,
      traffic: trafficData,
      polution: polutionData,
    },
  };
};
