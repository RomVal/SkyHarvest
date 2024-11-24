import { getCurrentPolutionData } from './data-providers/get-current-polution-data.js';
import { getCurrentWeatherData } from './data-providers/get-current-weather-data.js';
import { getGoogleMapsData } from './data-providers/get-google-maps-data.js';

/**
 * Fetches and combines weather, traffic, and pollution data for a given city.
 *
 * @param {Object} params - The parameters for fetching city data.
 * @param {string} params.cityName - The name of the city.
 * @param {Object} params.trafficConfig - The configuration for fetching traffic data.
 * @returns {Promise<Object>} The combined city data including weather, traffic, and pollution information.
 */
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
