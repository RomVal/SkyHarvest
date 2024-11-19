import { getGoogleMapsData } from './get-google-maps-data.js';
import { getCurrentWeatherData } from './get-current-weather-data.js';
import { getCurrentPolutionData } from './get-current-polution-data.js';

const PARSE_INTERVAL = 2000;

const startRequestLoop = () => {
  const makeRequests = () => {
    getCurrentWeatherData();
    getGoogleMapsData();
    getCurrentPolutionData();
  };

  setInterval(makeRequests, PARSE_INTERVAL);
};

// Start the loop
startRequestLoop();
