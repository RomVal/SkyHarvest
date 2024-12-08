from enum import Enum

class Columns(Enum):
    ID = 'ID'
    TEMP_C = 'temp_c'
    WIND_KPH = 'wind_kph'
    GUST_KPH = 'gust_kph'
    PRESSURE_MB = 'pressure_mb'
    PRECIP_MM = 'precip_mm'
    HUMIDITY = 'humidity'
    CLOUD = 'cloud'
    DEWPOINT_C = 'dewpoint_c'
    TRAFFIC_LEVEL = 'traffic_level'
    TRAFFIC_SPEED = 'traffic_speed'
    AQI = 'aqi'
    PM10 = 'pm10'
    PM25 = 'pm25'
    SO2 = 'so2'
    NO2 = 'no2'
    CO = 'co'

LAGS = {
    Columns.WIND_KPH: 16,
    Columns.TRAFFIC_LEVEL: 16,
    Columns.HUMIDITY: 5,
    Columns.TEMP_C: 5,
    Columns.PRECIP_MM: 5,
    Columns.CLOUD: 5
}