import pandas as pd
import matplotlib.pyplot as plt


data = pd.read_csv('./../../users_london.csv')

column_name = 'ID'  # header name
array = data[column_name].dropna().to_list()  # COnverting to list removing NaN values

column_values = 'traffic_level'  #  Y
column_dates = 'ID'   # X

# Take only days and hours
data['formatted_date'] = pd.to_datetime(data[column_dates]).dt.strftime('%Y-%m-%d %H:%M')

# Convert to list
y_values = data[column_values].dropna().to_list()
x_labels = data['formatted_date'].dropna().to_list()

# Show the graph
plt.figure(figsize=(10, 5))
plt.plot(x_labels, y_values, marker='o') 
plt.title(f'Графік даних зі стовпця "{column_values}"')
plt.xlabel('Дата та час')
plt.ylabel('Значення')
plt.xticks(rotation=45, ha='right') 
plt.grid()
plt.tight_layout() 
plt.show()