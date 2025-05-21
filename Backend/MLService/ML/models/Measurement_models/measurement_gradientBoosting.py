import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
from ML.data.measurement_data import fetch_measurement_data

def run_soil_humidity_gradient_boosting():
    df = fetch_measurement_data()
    df = df.sort_values("Timestamp")

    df["Hour"] = df["Timestamp"].dt.hour
    df["DayOfWeek"] = df["Timestamp"].dt.dayofweek

    feature_cols = ["Temperature", "AirHumidity", "Light", "Hour", "DayOfWeek"]
    X = df[feature_cols]
    y = df["SoilHumidity"]

    split_idx = int(len(df) * 0.75)
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

    model = GradientBoostingRegressor(n_estimators=200, max_depth=3, learning_rate=0.1, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    print("r^2 on train data is", model.score(X_train, y_train))
    print("r^2 on test data is", model.score(X_test, y_test))
    print("MSE on test data is", mean_squared_error(y_test, y_pred))
    print("Feature importances:", dict(zip(feature_cols, model.feature_importances_)))

    return model, X_test, y_test, y_pred, df, feature_cols, model.feature_importances_