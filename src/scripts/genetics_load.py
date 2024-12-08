import pandas as pd
from genetics_types import Columns
from sklearn.preprocessing import MinMaxScaler

#Module for loading data from csv file and creating lags
file_path = "./../../csv/users_berlin.csv"


# Load tha data and convert to numeric values except for the ID column which is converted to datetime

def load_data(file_path):
    data_raw = pd.read_csv(file_path)

    for column in Columns:
        if column == Columns.ID:
            data_raw[column.value] = pd.to_datetime(data_raw[column.value ], errors='coerce')
        else: 
            data_raw[column.value] = pd.to_numeric(data_raw[column.value], errors='coerce')   

    data_raw.fillna(0, inplace=True)

    return data_raw 


def get_normalized_data(data, lags, agregate='3H'):
    #Add lags
    for column, lag in lags.items():
        for i in range(1, lag + 1):
            data[f'{column.value}_lag_{i}'] = data[column.value].shift(i)

    data_with_lags = data.dropna(subset=[f'{column.value}_lag_{i}' for column, lag in lags.items() for i in range(1, lag + 1)])

    #Filter out the given columns
    COLUMNS_TO_KEEP = [Columns.ID.value, Columns.WIND_KPH.value, Columns.TRAFFIC_LEVEL.value, Columns.HUMIDITY.value,
                    Columns.TEMP_C.value, Columns.PRECIP_MM.value, Columns.CLOUD.value, Columns.AQI.value]
    COLUMNS_TO_KEEP += [f'{column.value}_lag_{i}' for column, lag in lags.items() for i in range(1, lag + 1)]

    # Filter out the columns
    data_filtered = data_with_lags[COLUMNS_TO_KEEP]
    data_with_lags = data_filtered.set_index(Columns.ID.value)

    # Aggregate the data
    data_agregated = data_with_lags.resample(agregate).mean()

    # Normalize the data by adding the normalized columns
    scaler_value = MinMaxScaler()
    for column in COLUMNS_TO_KEEP:
        if column != Columns.ID.value:
            data_agregated[f'{column}_normalized'] = scaler_value.fit_transform(data_agregated[[column]])

    return data_agregated

def split_normalized_data(data_agregated, y_column='aqi_normalized'):
    x_columns = [col for col in data_agregated.columns if col.endswith('_normalized') and col != y_column]

    X = data_agregated[x_columns].values
    y = data_agregated[y_column].values

    return X, y