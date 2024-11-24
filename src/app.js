import { addRecordtoCity } from './db/db-connector.js';
import { getCombinedCityData } from './get-combined-city-data.js';
import { loadCitiesConfig } from './load-cities-config.js';
import { logger } from './logger.js';

// Interval for making requests. As a rule, it should with 1h interval
const PARSE_INTERVAL = 1000 * 60 * 60;

/**
 * Starts a loop that periodically makes requests to gather and process city data.
 * The loop runs at intervals defined by the PARSE_INTERVAL constant.
 *
 * @function startRequestLoop
 */
const startRequestLoop = () => {
  /**
   * Asynchronously makes requests to get combined city data and adds records to each city.
   * Logs success or error messages.
   *
   * @async
   * @function makeRequests
   * @returns {Promise<void>} A promise that resolves when all city data has been processed.
   */
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
