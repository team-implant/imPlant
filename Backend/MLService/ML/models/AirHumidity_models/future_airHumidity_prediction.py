import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from ML.data.airHumidity_data import fetch_air_humidity_data

def forecast_air_humidity():
    df = fetch_air_humidity_data().sort_values("Timestamp").reset_index(drop=True)

    df["AirHumidity_t-1"] = df["AirHumidity"].shift(1)
    df["AirHumidity_t-2"] = df["AirHumidity"].shift(2)
    df = df.dropna()

    if len(df) < 2:
        raise ValueError("Not enough data to forecast 7 days ahead.")

    X = df[["AirHumidity_t-1", "AirHumidity_t-2"]]
    y = df["AirHumidity"]
    model = LinearRegression()
    model.fit(X, y)


    last_1 = df["AirHumidity"].iloc[-1]
    last_2 = df["AirHumidity"].iloc[-2]

    for _ in range(7): 
        next_input = np.array([[last_1, last_2]])
        next_prediction = model.predict(next_input)[0]
        last_2, last_1 = last_1, next_prediction

    target_date = df["Timestamp"].iloc[-1] + pd.Timedelta(days=7)

    return {
        "target_date": target_date.strftime("%Y-%m-%d"),
        "predictedAirHumidity": round(float(next_prediction), 2),
        "unit": "%",
        "prediction_horizon": "7 days",
        "based_on": {
            "t-1": round(df["AirHumidity"].iloc[-1], 2),
            "t-2": round(df["AirHumidity"].iloc[-2], 2)
        }
    }
