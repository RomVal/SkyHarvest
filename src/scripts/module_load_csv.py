import pandas as pd
import numpy as np
from enum import Enum
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from gmdh import Mia, Combi, Ria
import matplotlib.pyplot as plt
from genetics_types import Columns, LAGS

#Module for loading data from csv file and creating lags

file_path = "./../../csv/users_berlin.csv"
#file_path = "./../../csv/users_amsterdam.csv"

AGREGATE = '2H'

# Load tha data and convert to numeric values except for the ID column which is converted to datetime
data = pd.read_csv(file_path)

for column in Columns:
    if column == Columns.ID:
        data[column.value] = pd.to_datetime(data[column.value ], errors='coerce')
    else: 
        data[column.value] = pd.to_numeric(data[column.value], errors='coerce')


data.fillna(0, inplace=True)

#Add lags
for column, lag in LAGS.items():
    for i in range(1, lag + 1):
        data[f'{column.value}_lag_{i}'] = data[column.value].shift(i)

data = data.dropna(subset=[f'{column.value}_lag_{i}' for column, lag in LAGS.items() for i in range(1, lag + 1)])

#Filter out the given columns
COLUMNS_TO_KEEP = [Columns.ID.value, Columns.WIND_KPH.value, Columns.TRAFFIC_LEVEL.value, Columns.HUMIDITY.value,
                    Columns.TEMP_C.value, Columns.PRECIP_MM.value, Columns.CLOUD.value, Columns.AQI.value]
COLUMNS_TO_KEEP += [f'{column.value}_lag_{i}' for column, lag in LAGS.items() for i in range(1, lag + 1)]

# Filter out the columns
data_filtered = data[COLUMNS_TO_KEEP]
data = data_filtered.set_index(Columns.ID.value)
 
# Aggregate the data
data_agregated = data.resample(AGREGATE).mean()

# Normalize the data by adding the normalized columns
scaler_value = MinMaxScaler()
for column in COLUMNS_TO_KEEP:
    if column != Columns.ID.value:
        data_agregated[f'{column}_normalized'] = scaler_value.fit_transform(data_agregated[[column]])

# Define the input for the model out of normalized columns
y_column = 'aqi_normalized'
x_columns = [col for col in data_agregated.columns if col.endswith('_normalized') and col != y_column]

X = data_agregated[x_columns].values
y = data_agregated[y_column].values

mia_model = Ria()
mia_model.fit(X, y)
y_pred_ria = mia_model.predict(X)
ria_mse = mean_squared_error(y, y_pred_ria)
ria_mae = mean_absolute_error(y, y_pred_ria)
ria_r2 = r2_score(y, y_pred_ria)

mia_model = Mia() #Combi()
mia_model.fit(X, y)
y_pred_mia = mia_model.predict(X)
mia_mse = mean_squared_error(y, y_pred_mia)
mia_mae = mean_absolute_error(y, y_pred_mia)
mia_r2 = r2_score(y, y_pred_mia)

print("=== RIA Model ===")
print('Model RIA equation:', mia_model.get_best_polynomial())
#print("Прогнози MIA моделі:", y_pred_mia)
print("ria_mse:", ria_mse )
print("ria_mae:", ria_mae )
print("ria_r2:", ria_r2 )

print("\n=== MIA Model ===")
print('Model Mia equation:', mia_model.get_best_polynomial())
#print("Прогнози Combi моделі:", y_pred_combi)
print("mia_mse:", mia_mse )
print("mia_mae:", mia_mae )
print("mia_r2:", mia_r2 )

for i, column in enumerate(x_columns, start=1):
    print(f"Param: {i}: {column}")

plt.figure(figsize=(10, 6))
plt.plot(y, label='Actual y', marker='o', linestyle='-', color='black')
plt.plot(y_pred_ria, label='Predicted y, Ria', marker='x', linestyle='--', color='blue')
#plt.plot(y_pred_mia, label='Predicted y, Mia', marker='x', linestyle='--', color='green')
plt.xlabel('Index')
plt.ylabel('y')
plt.title('Actual vs Predicted values for Mia and Ria models')
plt.legend()
plt.grid(True)
plt.show()