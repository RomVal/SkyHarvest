import random
from deap import base, creator, tools, algorithms
from genetics_load import load_data, get_normalized_data, split_normalized_data
from genetics_types import Columns
from gmdh import Ria
from sklearn.metrics import r2_score

file_path = "./../../csv/users_berlin.csv"
data_raw = load_data(file_path)

#data_with_lags = get_normalized_data(data_raw, {Columns.WIND_KPH: 2, Columns.TRAFFIC_LEVEL: 1})

#print(data_with_lags.head(3))

def train_and_evaluate_model(lag_wind_kph, lag_traffic_level, lag_humidity, lag_temp_c, lag_precip_mm, lag_cloud):
    data_with_lags = get_normalized_data(data_raw, {
        Columns.WIND_KPH: lag_wind_kph,
        Columns.TRAFFIC_LEVEL: lag_traffic_level,
        Columns.HUMIDITY: lag_humidity,
        Columns.TEMP_C: lag_temp_c,
        Columns.PRECIP_MM: lag_precip_mm,
        Columns.CLOUD: lag_cloud
    })

    X, y = split_normalized_data(data_with_lags)

    mia_model = Ria()
    mia_model.fit(X, y)
    y_pred_ria = mia_model.predict(X)
    ria_r2 = r2_score(y, y_pred_ria)

    return ria_r2

# Визначення функції оцінки
def evaluate(individual):
    # Розпакування кількості лагів для кожної змінної
    lag_wind_kph, lag_traffic_level, lag_humidity, lag_temp_c, lag_precip_mm, lag_cloud = individual
    
    # Генерація нового набору даних з відповідними лагами
    # Навчання моделі та обчислення R^2
    r2_score = train_and_evaluate_model(lag_wind_kph, lag_traffic_level, lag_humidity, lag_temp_c, lag_precip_mm, lag_cloud)
    
    return r2_score,

# Налаштування генетичного алгоритму
creator.create("FitnessMax", base.Fitness, weights=(1.0,))
creator.create("Individual", list, fitness=creator.FitnessMax)

toolbox = base.Toolbox()
toolbox.register("attr_int", random.randint, 0, 20)  # Діапазон значень для лагів
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_int, n=6)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

toolbox.register("mate", tools.cxTwoPoint)
toolbox.register("mutate", tools.mutUniformInt, low=0, up=10, indpb=0.2)
toolbox.register("select", tools.selTournament, tournsize=3)
toolbox.register("evaluate", evaluate)

# Ініціалізація популяції
population = toolbox.population(n=50)

# Запуск генетичного алгоритму
algorithms.eaSimple(population, toolbox, cxpb=0.5, mutpb=0.2, ngen=30, verbose=True)

# Виведення найкращого рішення
best_individual = tools.selBest(population, k=1)[0]
print("Найкраща комбінація лагів:", best_individual)

