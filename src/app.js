import { loadCitiesConfig } from './load-cities-config.js';
import { getCombinedCityData } from './get-combined-city-data.js';
import { addRecordtoCity } from './db/db-connector.js';
import { logger } from './logger.js';

// Interval for making requests. As a rule, it should with 1h interval
const PARSE_INTERVAL = 10000;

const startRequestLoop = () => {
  const makeRequests = async () => {
    try {
      const citiesConfig = loadCitiesConfig();
      for (const city of citiesConfig) {
        const combinedData = await getCombinedCityData({
          cityName: city?.name,
          trafficConfig: city?.traffic,
        });

        addRecordtoCity(
          city?.name,
          combinedData?.timestamp,
          combinedData?.data
        );
      }

      logger.info(`Data for cities successfully added.`);
    } catch (error) {
      logger.error(`Error when adding city data`, {
        message: error?.message,
      });
    }
  };

  setInterval(makeRequests, PARSE_INTERVAL);
};

// Start the main loop
try {
  startRequestLoop();
} catch (startupError) {
  logger.error(`Fatal error during application startup`, {
    error: startupError?.message,
  });
  process.exit(1);
}
