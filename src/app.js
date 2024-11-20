import { getGoogleMapsData } from './get-google-maps-data.js';
import { getCurrentWeatherData } from './get-current-weather-data.js';
import { getCurrentPolutionData } from './get-current-polution-data.js';
import { loadCitiesConfig } from './load-cities-config.js';

const PARSE_INTERVAL = 10000;

const startRequestLoop = () => {
  const makeRequests = async () => {
    const citiesData = loadCitiesConfig();
    for (const city of citiesData) {
      const weatherData = await getCurrentWeatherData(city?.name);
      const trafficData = await getGoogleMapsData(city?.traffic);
      const polutionData = await getCurrentPolutionData(city?.name);

      console.log(`WEATHER_DATA: ${city?.name}`, weatherData);
      console.log(`TRAFFIC_DATA: ${city?.name}`, trafficData);
      console.log(`POLUTION_DATA: ${city?.name}`, polutionData);
    }
  };

  setInterval(makeRequests, PARSE_INTERVAL);
};

// Start the loop
startRequestLoop();
