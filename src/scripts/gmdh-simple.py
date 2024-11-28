from gmdh import Combi, split_data, Mia

# Additional points with nonlinear dependency
X = [[1, 2, 3], [3, 2, 3], [7, 0, 1], [5, 5, 4], [1, 4, 3], [2, 6, 5]]
y = [2*x[0]**2 + 3*x[1]**3 - x[0]*x[1] for x in X]

# Split data into training and test sets
x_train, x_test, y_train, y_test = split_data(X, y)

# Output the results of the split
print('x_train:\n', x_train)
print('x_test:\n', x_test)
print('\ny_train:\n', y_train)
print('y_test:\n', y_test)

# Build the model
model = Mia()
model.fit(x_train, y_train)
y_predicted = model.predict(x_test)

# Compare the prediction with the actual values
print('y_predicted: ', y_predicted)
print('y_test: ', y_test)

# Output the analytical equation
print('Model equation:', model.get_best_polynomial())