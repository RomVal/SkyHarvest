import pandas as pd
import matplotlib.pyplot as plt


data = pd.read_csv('./../../users_london.csv')

column_name = 'traffic_level'  # header name
array = data[column_name].dropna().to_list()  # COnverting to list removing NaN values

# Showing the graph
plt.plot(array)
plt.title(f'Graph for "{column_name}"')
plt.xlabel('Index')
plt.ylabel('Value')
plt.grid()
plt.show()