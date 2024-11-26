import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import sys

cityName = None
startDate = None
endDate = None

if len(sys.argv) > 1:
    cityName = sys.argv[1] 
    correlationField1 = sys.argv[2] 
    correlationField2 = sys.argv[3] 

if cityName is None:
    print('Please provide city name as parameter')
    sys.exit()

if correlationField1 is None or correlationField2 is None:
    print('Please provide the correlation parameters')
    sys.exit()

# Load data from CSV
file_path = f"./csv/users_{cityName}.csv" 
data = pd.read_csv(file_path)

# Columns for analysis
col1 = correlationField1 
col2 = correlationField2  # Polution level as a rule

#traffic, wind, precipitation, humidity, cloud, temp

# Range of lags
max_lag = 10  # Maximum shift
lags = range(-max_lag, max_lag + 1)

# Calculate correlation for each lag
correlations = []
for lag in lags:
    shifted = data[col2].shift(lag)  # Shift the second column
    correlation = data[col1].corr(shifted)  # Correlation between columns
    correlations.append(correlation)

# Find the highest correlation and the corresponding lag
best_lag = lags[np.argmax(correlations)]
best_correlation = max(correlations)

print(f"Highest correlation: {best_correlation:.2f} at lag {best_lag}")

# Visualization
plt.figure(figsize=(8, 4))
plt.plot(lags, correlations, marker='o')
plt.title(f'Correlation {correlationField1} and {correlationField2} depending on lag')
plt.xlabel(f'Lag {correlationField2}. hours') 
plt.ylabel('Correlation')
plt.axvline(best_lag, color='red', linestyle='--', label=f'Best lag: {best_lag}')
plt.legend()
plt.grid()
plt.show()