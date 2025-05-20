import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from ML.data.measurement_data import fetch_measurement_data

def run_measurement_random_forest():
    df = fetch_measurement_data()
    df["TimestampOrdinal"] = df["Timestamp"].map(lambda x: x.toordinal())
    X = df[["TimestampOrdinal"]]
    y = df[["Temperature", "AirHumidity", "SoilHumidity", "Light"]]

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
    model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=1))
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    print("r^2 on train data is", model.score(X_train, y_train))
    print("r^2 on test data is", model.score(X_test, y_test))
    print("MSE for each target:", mean_squared_error(y_test, y_pred, multioutput='raw_values'))

    return model, X_test, y_test, y_pred, df