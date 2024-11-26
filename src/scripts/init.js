import { CITY } from './../default-cities-config.js';

// =================================================================================================
/**
 * * @constant {CITY}
 * The name of the city for which statistics are being generated.
 */
export const CITY_NAME = CITY.beijing;
// Start and end time (UTC) for which to generate statistics
export const START_DATE = new Date('2024-11-23T08:00:00.000Z');
export const END_DATE = new Date('2024-11-26T23:59:59.999Z');

// =================================================================================================
/**
 * Correlation analysis
 */
export const CORRELATION_FIELD1 = 'wind_kph';

/* Air quality index. This value will be shifter in the correlation analysis script
 to find the best correlation with the field #1.
*/
export const CORRELATION_FIELD2 = 'aqi';
