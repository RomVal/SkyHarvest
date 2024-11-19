import { getGoogleMapsData } from './get-google-maps-data.js';
import { makeWeatherRequest } from './get-current-weather-data.js';
import { makePolutionRequest } from './get-current-polution-data.js';

const PARSE_INTERVAL = 2000;

const startRequestLoop = () => {
  const makeRequests = () => {
    makeWeatherRequest();
    makePolutionRequest();
    getGoogleMapsData();
  };

  setInterval(makeRequests, PARSE_INTERVAL);
};

// Start the loop
startRequestLoop();
