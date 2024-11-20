import { loadCitiesConfig } from './load-cities-config.js';
import { getCombinedCityData } from './get-combined-city-data.js';
import { addRecordtoCity } from './db-connector.js';

const PARSE_INTERVAL = 10000;

const startRequestLoop = () => {
  const makeRequests = async () => {
    const citiesConfig = loadCitiesConfig();
    for (const city of citiesConfig) {
      const combinedData = await getCombinedCityData({
        cityName: city?.name,
        trafficConfig: city?.traffic,
      });

      addRecordtoCity(city?.name, combinedData?.timestamp, combinedData?.data);
    }
  };

  setInterval(makeRequests, PARSE_INTERVAL);
};

// Start the loop
startRequestLoop();
