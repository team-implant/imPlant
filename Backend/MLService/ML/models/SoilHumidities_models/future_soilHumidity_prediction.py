import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from ML.data.soilHumidity_data import fetch_soil_humidity_data

def forecast_soil_humidity():
    df = fetch_soil_humidity_data().sort_values("Timestamp").reset_index(drop=True)

    df["SoilHumidity_t-1"] = df["SoilHumidity"].shift(1)
    df["SoilHumidity_t-2"] = df["SoilHumidity"].shift(2)
    df = df.dropna()

    if len(df) < 2:
        raise ValueError("Not enough data to forecast 7 days ahead.")

    X = df[["SoilHumidity_t-1", "SoilHumidity_t-2"]]
    y = df["SoilHumidity"]
    model = LinearRegression()
    model.fit(X, y)

    last_1 = df["SoilHumidity"].iloc[-1]
    last_2 = df["SoilHumidity"].iloc[-2]

    for _ in range(7):
        next_input = np.array([[last_1, last_2]])
        next_prediction = model.predict(next_input)[0]
        last_2, last_1 = last_1, next_prediction

    target_date = df["Timestamp"].iloc[-1] + pd.Timedelta(days=7)

    return {
        "target_date": target_date.strftime("%Y-%m-%d"),
        "predictedSoilHumidity": round(float(next_prediction), 2),
        "unit": "%",
        "prediction_horizon": "7 days",
        "based_on": {
            "t-1": round(df["SoilHumidity"].iloc[-1], 2),
            "t-2": round(df["SoilHumidity"].iloc[-2], 2)
        }
    }
