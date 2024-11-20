import { loadCitiesConfig } from './load-cities-config.js';
import { getCombinedCityData } from './get-combined-city-data.js';

const PARSE_INTERVAL = 10000;

const startRequestLoop = () => {
  const makeRequests = async () => {
    const citiesConfig = loadCitiesConfig();
    for (const city of citiesConfig) {
      const combinedData = await getCombinedCityData({
        cityName: city?.name,
        trafficConfig: city?.traffic,
      });

      console.log('COMBINED_DATA', JSON.stringify(combinedData));
    }
  };

  setInterval(makeRequests, PARSE_INTERVAL);
};

// Start the loop
startRequestLoop();
