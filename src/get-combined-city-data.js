import { getGoogleMapsData } from './get-google-maps-data.js';
import { getCurrentWeatherData } from './get-current-weather-data.js';
import { getCurrentPolutionData } from './get-current-polution-data.js';

export const getCombinedCityData = async ({ cityName, trafficConfig }) => {
  const weatherData = await getCurrentWeatherData(cityName);
  const trafficData = await getGoogleMapsData(trafficConfig);
  const polutionData = await getCurrentPolutionData(cityName);

  return {
    cityName: cityName?.toLowerCase(),
    data: {
      time: new Date().toISOString(),
      weather: weatherData,
      traffic: trafficData,
      polution: polutionData,
    },
  };
};
