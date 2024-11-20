export const getCombinedCityData = ({
  cityName,
  weatherData,
  trafficData,
  polutionData,
}) => {
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
