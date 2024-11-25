import pandas as pd
import matplotlib.pyplot as plt
import sys

cityName = None
startDate = None
endDate = None

if len(sys.argv) > 1:
    cityName = sys.argv[1] 
    startDate = sys.argv[2] 
    endDate = sys.argv[3] 

print(startDate); print(endDate)

if cityName is None:
    print('Please provide city name as parameter')
    sys.exit()

if startDate is not None:
    startDate = pd.to_datetime(startDate).strftime('%d-%m-%y:%H')

if endDate is not None:
    endDate = pd.to_datetime(endDate).strftime('%d-%m-%y:%H')

data = pd.read_csv(f'./csv/users_{cityName}.csv')

#Data collection
column_y1 = 'traffic_level'  # First column for Y axis
column_y2 = 'wind_kph'  # Second column for Y axis
column_y3 = 'aqi'  # Third column for Y axis
column_y4 = 'precip_mm'  # Fourth column for Y axis
column_dates = 'ID'  # Column with dates for X axis

#Date formatting
data['formatted_date'] = pd.to_datetime(data[column_dates]).dt.strftime('%d-%m-%y:%H')

#Converting data to arrays
y_values_1 = data[column_y1].dropna().to_list()
y_values_1 = [value * 30 for value in y_values_1]
y_values_2 = data[column_y2].dropna().to_list()
y_values_3 = data[column_y3].dropna().to_list()
y_values_4 = data[column_y4].dropna().to_list()
y_values_4 = [value * 5 for value in y_values_4]
x_labels = data['formatted_date'].dropna().to_list()

#Displaying the plot with two lines
plt.figure(figsize=(10, 6))
plt.plot(x_labels, y_values_1, label=f'Traffic "{column_y1}"', marker='o')
plt.plot(x_labels, y_values_2, label=f'Wind speed "{column_y2}"', marker='x')
plt.plot(x_labels, y_values_3, label=f'Polution "{column_y3}"', marker='*')
plt.plot(x_labels, y_values_4, label=f'Precip_mm "{column_y4}"', marker='.')

plt.title(f'Polution in {cityName.capitalize()} between {startDate} and {endDate} UTC time')
plt.xlabel('Timestamp')
plt.ylabel('Value')
plt.xticks(rotation=45, ha='right')
plt.grid()
plt.legend()
plt.tight_layout()
plt.show()